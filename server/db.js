// Simple file-based database for testing (without MongoDB)
const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, 'data');
const usersFile = path.join(dbDir, 'users.json');
const workoutsFile = path.join(dbDir, 'workouts.json');
const dietsFile = path.join(dbDir, 'diets.json');
const wellnessFile = path.join(dbDir, 'wellness.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize files if they don't exist
const initFiles = () => {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
  }
  if (!fs.existsSync(workoutsFile)) {
    fs.writeFileSync(workoutsFile, JSON.stringify([]));
  }
  if (!fs.existsSync(dietsFile)) {
    fs.writeFileSync(dietsFile, JSON.stringify([]));
  }
  if (!fs.existsSync(wellnessFile)) {
    fs.writeFileSync(wellnessFile, JSON.stringify([]));
  }
};

initFiles();

// Helper functions
const readData = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Database exports
module.exports = {
  // Users
  users: {
    findOne: (query) => {
      const users = readData(usersFile);
      return users.find(u => {
        for (let key in query) {
          if (u[key] !== query[key]) return false;
        }
        return true;
      });
    },
    create: (data) => {
      const users = readData(usersFile);
      const newUser = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      writeData(usersFile, users);
      return newUser;
    },
    findByIdAndUpdate: (id, data) => {
      const users = readData(usersFile);
      const index = users.findIndex(u => u._id === id);
      if (index > -1) {
        users[index] = { ...users[index], ...data, updatedAt: new Date() };
        writeData(usersFile, users);
        return users[index];
      }
      return null;
    },
    findById: (id) => {
      const users = readData(usersFile);
      return users.find(u => u._id === id);
    },
  },

  // Workouts
  workouts: {
    create: (data) => {
      const workouts = readData(workoutsFile);
      const newWorkout = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      workouts.push(newWorkout);
      writeData(workoutsFile, workouts);
      return newWorkout;
    },
    find: (query) => {
      const workouts = readData(workoutsFile);
      return workouts.filter(w => {
        for (let key in query) {
          if (w[key] !== query[key]) return false;
        }
        return true;
      });
    },
    findByIdAndDelete: (id) => {
      const workouts = readData(workoutsFile);
      const index = workouts.findIndex(w => w._id === id);
      if (index > -1) {
        const deleted = workouts.splice(index, 1);
        writeData(workoutsFile, workouts);
        return deleted[0];
      }
      return null;
    },
  },

  // Diets
  diets: {
    create: (data) => {
      const diets = readData(dietsFile);
      const newDiet = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      diets.push(newDiet);
      writeData(dietsFile, diets);
      return newDiet;
    },
    find: (query) => {
      const diets = readData(dietsFile);
      return diets.filter(d => {
        for (let key in query) {
          if (d[key] !== query[key]) return false;
        }
        return true;
      });
    },
    findByIdAndDelete: (id) => {
      const diets = readData(dietsFile);
      const index = diets.findIndex(d => d._id === id);
      if (index > -1) {
        const deleted = diets.splice(index, 1);
        writeData(dietsFile, diets);
        return deleted[0];
      }
      return null;
    },
  },

  // Wellness
  wellness: {
    create: (data) => {
      const wellness = readData(wellnessFile);
      const newWellness = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      wellness.push(newWellness);
      writeData(wellnessFile, wellness);
      return newWellness;
    },
    find: (query) => {
      const wellness = readData(wellnessFile);
      return wellness.filter(w => {
        for (let key in query) {
          if (w[key] !== query[key]) return false;
        }
        return true;
      });
    },
    findByIdAndDelete: (id) => {
      const wellness = readData(wellnessFile);
      const index = wellness.findIndex(w => w._id === id);
      if (index > -1) {
        const deleted = wellness.splice(index, 1);
        writeData(wellnessFile, wellness);
        return deleted[0];
      }
      return null;
    },
  },
};
