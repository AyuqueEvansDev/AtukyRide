const APP = {
  STORAGE_KEY: 'chasquimoto_users',
  SESSION_KEY: 'chasquimoto_session',
  RIDES_KEY: 'chasquimoto_rides',

  /* ─── Cross-navigation storage (localStorage + window.name fallback) ─── */

  _get(key, defaultVal) {
    const val = localStorage.getItem(key);
    if (val !== null) return JSON.parse(val);
    try {
      const all = JSON.parse(window.name || '{}');
      if (all && key in all) return all[key];
    } catch (e) { /* window.name not available */ }
    return defaultVal;
  },

  _set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    try {
      const all = JSON.parse(window.name || '{}');
      all[key] = value;
      window.name = JSON.stringify(all);
    } catch (e) { /* window.name not available */ }
  },

  _remove(key) {
    localStorage.removeItem(key);
    try {
      const all = JSON.parse(window.name || '{}');
      delete all[key];
      window.name = JSON.stringify(all);
    } catch (e) { /* window.name not available */ }
  },

  getUrlParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  /* ─── Auth ─── */

  getUsers() {
    return this._get(this.STORAGE_KEY, []);
  },

  saveUsers(users) {
    this._set(this.STORAGE_KEY, users);
  },

  getSession() {
    return this._get(this.SESSION_KEY, null);
  },

  saveSession(email, role) {
    this._set(this.SESSION_KEY, {
      email, role, timestamp: Date.now()
    });
  },

  clearSession() {
    this._remove(this.SESSION_KEY);
  },

  restoreSessionFromUrl() {
    const email = this.getUrlParam('session');
    const role = this.getUrlParam('role');
    if (email && role && !this.getSession()) {
      const users = this.getUsers();
      if (users.find(u => u.email === email)) {
        this.saveSession(email, role);
      }
      const url = new URL(window.location);
      url.searchParams.delete('session');
      url.searchParams.delete('role');
      window.history.replaceState({}, '', url);
    }
  },

  register(name, email, phone, password, role) {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Este correo ya está registrado.' };
    }
    const user = {
      name, email, phone, password, role,
      created: Date.now()
    };
    if (role === 'driver') {
      user.available = true;
      user.car = { model: '', color: '', plate: '' };
      user.rating = 5.0;
      user.rides = 0;
      user.location = null;
    }
    users.push(user);
    this.saveUsers(users);
    return { success: true };
  },

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, error: 'Correo o contraseña incorrectos.' };
    }
    this.saveSession(email, user.role);
    return { success: true, user };
  },

  logout() {
    const session = this.getSession();
    if (session && session.role === 'driver') {
      this.setDriverAvailable(session.email, false);
    }
    this.clearSession();
    window.location.href = 'login.html';
  },

  getCurrentUser() {
    const session = this.getSession();
    if (!session) return null;
    const users = this.getUsers();
    return users.find(u => u.email === session.email) || null;
  },

  requireAuth() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    return user;
  },

  requireRole(role) {
    const user = this.requireAuth();
    if (!user) return null;
    if (user.role !== role) {
      const target = user.role === 'driver' ? 'conductor.html' : 'principal.html';
      if (!window.location.pathname.endsWith(target)) {
        window.location.href = target + '?session=' + encodeURIComponent(user.email) + '&role=' + user.role;
      }
      return null;
    }
    return user;
  },

  redirectIfAuthenticated() {
    const session = this.getSession();
    if (session) {
      window.location.href = session.role === 'driver' ? 'conductor.html' : 'principal.html';
    }
  },

  /* ─── Drivers & Seed ─── */

  seedUsers() {
    const users = this.getUsers();
    const existingDrivers = users.filter(u => u.role === 'driver');
    if (existingDrivers.length >= 3 && users.find(u => u.email === 'maria@chasquimoto.com')) return;

    if (!users.find(u => u.email === 'maria@chasquimoto.com')) {
      users.push({
        name: 'María García', email: 'maria@chasquimoto.com', phone: '+52 55 1111 2222',
        password: 'user123', role: 'user', created: Date.now() - 86400000 * 30
      });
    }

    const fakeDrivers = [
      {
        name: 'Carlos Méndez', email: 'carlos@chasquimoto.com', phone: '+52 55 1234 5678',
        password: 'driver123', role: 'driver', available: true,
        car: { model: 'Toyota Prius', color: 'Plata', plate: 'ABC-123' },
        rating: 4.9, rides: 342, created: Date.now() - 86400000 * 30, location: null
      },
      {
        name: 'Ana López', email: 'ana@chasquimoto.com', phone: '+52 55 8765 4321',
        password: 'driver123', role: 'driver', available: true,
        car: { model: 'Nissan Leaf', color: 'Blanco', plate: 'XYZ-789' },
        rating: 4.8, rides: 215, created: Date.now() - 86400000 * 20, location: null
      },
      {
        name: 'Roberto Díaz', email: 'roberto@chasquimoto.com', phone: '+52 55 2468 1357',
        password: 'driver123', role: 'driver', available: true,
        car: { model: 'Chevrolet Bolt', color: 'Azul', plate: 'DEF-456' },
        rating: 4.7, rides: 178, created: Date.now() - 86400000 * 15, location: null
      }
    ];

    fakeDrivers.forEach(d => {
      if (!users.find(u => u.email === d.email)) {
        users.push(d);
      }
    });

    this.saveUsers(users);
  },

  getAvailableDrivers() {
    return this.getUsers().filter(u => u.role === 'driver' && u.available);
  },

  setDriverAvailable(email, available) {
    const users = this.getUsers();
    const driver = users.find(u => u.email === email);
    if (driver) {
      driver.available = available;
      this.saveUsers(users);
    }
  },

  updateDriverLocation(email, lat, lng) {
    const users = this.getUsers();
    const driver = users.find(u => u.email === email);
    if (driver) {
      driver.location = { lat, lng };
      this.saveUsers(users);
    }
  },

  /* ─── Rides ─── */

  getRides() {
    return this._get(this.RIDES_KEY, []);
  },

  saveRides(rides) {
    this._set(this.RIDES_KEY, rides);
  },

  createRide(userEmail, fromName, toName, fromCoords, toCoords) {
    const rides = this.getRides();
    const ride = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      userEmail,
      driverEmail: null,
      fromName, toName,
      fromLat: fromCoords[0], fromLng: fromCoords[1],
      toLat: toCoords[0], toLng: toCoords[1],
      status: 'searching',
      createdAt: Date.now(),
      acceptedAt: null,
      arrivedAt: null,
      startedAt: null,
      completedAt: null,
      driverLocation: null
    };
    rides.push(ride);
    this.saveRides(rides);
    return ride;
  },

  findDriverForRide(rideId) {
    const available = this.getAvailableDrivers();
    if (available.length === 0) return null;
    const driver = available[Math.floor(Math.random() * available.length)];
    const rides = this.getRides();
    const ride = rides.find(r => r.id === rideId);
    if (!ride || ride.status !== 'searching') return null;

    ride.driverEmail = driver.email;
    ride.status = 'accepted';
    ride.acceptedAt = Date.now();
    this.saveRides(rides);

    this.setDriverAvailable(driver.email, false);

    return driver;
  },

  driverArrived(rideId) {
    const rides = this.getRides();
    const ride = rides.find(r => r.id === rideId);
    if (!ride) return null;
    ride.status = 'arrived';
    ride.arrivedAt = Date.now();
    this.saveRides(rides);
    return ride;
  },

  startTrip(rideId) {
    const rides = this.getRides();
    const ride = rides.find(r => r.id === rideId);
    if (!ride) return null;
    ride.status = 'in_progress';
    ride.startedAt = Date.now();
    this.saveRides(rides);
    return ride;
  },

  completeTrip(rideId) {
    const rides = this.getRides();
    const ride = rides.find(r => r.id === rideId);
    if (!ride) return null;
    ride.status = 'completed';
    ride.completedAt = Date.now();
    this.saveRides(rides);

    if (ride.driverEmail) {
      const users = this.getUsers();
      const driver = users.find(u => u.email === ride.driverEmail);
      if (driver) {
        driver.available = true;
        driver.rides++;
        this.saveUsers(users);
      }
    }

    return ride;
  },

  getActiveRideForUser(email) {
    return this.getRides().find(r =>
      r.userEmail === email &&
      ['searching', 'accepted', 'arrived', 'in_progress'].includes(r.status)
    );
  },

  getPendingRidesForDrivers() {
    return this.getRides().filter(r => r.status === 'searching');
  },

  getActiveRideForDriver(email) {
    return this.getRides().find(r =>
      r.driverEmail === email &&
      ['accepted', 'arrived', 'in_progress'].includes(r.status)
    );
  },

  getDriverByEmail(email) {
    return this.getUsers().find(u => u.email === email && u.role === 'driver');
  },

  /* ─── Simulation ─── */

  simulateDriverSearch(rideId, callbacks) {
    const timeout = 2000 + Math.random() * 2000;

    const timer = setTimeout(() => {
      const driver = this.findDriverForRide(rideId);
      if (driver && callbacks.onFound) {
        callbacks.onFound(driver);

        setTimeout(() => {
          if (callbacks.onArriving) callbacks.onArriving();
        }, 5000);

        setTimeout(() => {
          this.driverArrived(rideId);
          if (callbacks.onArrived) callbacks.onArrived();
        }, 10000);
      } else {
        if (callbacks.onNotFound) callbacks.onNotFound();
      }
    }, timeout);

    return { cancel: () => clearTimeout(timer) };
  }
};

(function migrate() {
  const users = APP._get(APP.STORAGE_KEY, []);
  let changed = false;
  users.forEach(u => { if (!u.role) { u.role = 'user'; changed = true; } });
  if (changed) APP._set(APP.STORAGE_KEY, users);
})();
APP.seedUsers();
APP.restoreSessionFromUrl();
