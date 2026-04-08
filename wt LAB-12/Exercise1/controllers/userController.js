let users = [
    { id: 1, name: "Shreya" },
    { id: 2, name: "Rahul" }
];

// GET all users
exports.getAllUsers = (req, res) => {
    res.json(users);
};

// GET user by ID (dynamic route)
exports.getUserById = (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
};

// POST create user
exports.createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

// PUT update user
exports.updateUser = (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name;
    res.json(user);
};

// DELETE user
exports.deleteUser = (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "User deleted" });
};