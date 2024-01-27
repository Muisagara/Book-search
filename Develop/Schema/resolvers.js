const { User, Book } = require('../server/models');
const { signToken, AuthenticationError } = require('../server/utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }
      return user;
    }
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !user.isCorrectPassword(password)) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_, { bookInput }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      const savedBook = await Book.create(bookInput);
      user.savedBooks.push(savedBook);
      await user.save();

      return user;
    },

    removeBook: async (_, { bookId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      user.savedBooks = user.savedBooks.filter(book => book.id !== bookId);
      await user.save();

      return user;
    }
  }
};

module.exports = resolvers;
