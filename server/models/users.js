class UserModel {
  constructor(db) {
    this.db = db;
    this.collection = this.db.collection('users');
  }

  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    const result = await this.collection.insertOne(user);
    return result.ops[0];
  }

  async findUserByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async findUserById(id) {
    return await this.collection.findOne({ _id: new mongodb.ObjectId(id) });
  }

  async updateUser(id, updates) {
    return await this.collection.updateOne(
      { _id: new mongodb.ObjectId(id) },
      { $set: updates }
    );
  }
}

module.exports = UserModel;