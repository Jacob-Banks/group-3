const { User, Appointment } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("appoinments");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    appointments: async (parent, { day }) => {
      const params = day ? { day } : {};
      return Appointment.find(params).sort({ day: -1 });
    },

    // appointments: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Appointment.find(params).sort({ createdAt: -1 });
    // },

    appointment: async (parent, { _id }) => {
      return Appointment.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find().select("-__v -password").populate("appointments");
    },

    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("appointments");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addAppointment: async (parent, args, context) => {
      if (context.user) {
        const appointment = await Appointment.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { appointments: appointment._id } },
          { new: true }
        );

        return appointment;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    cancelAppointment: async (parent, args, context) => {
      const updatedAppointment = await Appointment.findOneAndDelete(
        { _id: args }
        // { $pull: { appointments: { args } } },
        // { new: true }
      );
      return updatedAppointment;
    },
  },
};

module.exports = resolvers;
