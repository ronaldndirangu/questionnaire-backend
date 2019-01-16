import bcrypt from 'bcrypt';
import User from '../../models/user.models';

class UserController {
  static async updateUser(req, res) {
    const { userId } = req.params;
    const { firstName, lastName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.findByIdAndUpdate(userId,
        {
          $set: {
            firstName,
            lastName,
            password: hashedPassword,
          },
        },
        { new: true });
      res.status(200).json({
        message: 'User updated successfully!',
        data: [user],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      res.status(200).json({
        message: 'User retrieved successfully!',
        data: [user],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json({
        message: 'Users retrieved successfully!',
        data: users,
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const deletedUser = await User.findByIdAndRemove(userId);
      res.status(200).json({
        message: 'User deleted successfully!',
        data: [deletedUser],
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;
