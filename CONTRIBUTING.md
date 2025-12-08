# Contributing to Q-Mobile

Thank you for your interest in contributing to Q-Mobile! This document provides guidelines for contributing to this project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/q-mobile.git
   cd q-mobile
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Code Style

- We use TypeScript for type safety
- Follow the existing code style in the project
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly:
   - Run on iOS: `npm run ios`
   - Run on Android: `npm run android`
   - Run linter: `npm run lint`
3. Commit your changes with clear commit messages:
   ```bash
   git commit -m "Add feature: description of your change"
   ```

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Be concise but descriptive
- Reference issues and pull requests when relevant

### Pull Request Process

1. **Update documentation** if you've made changes to:
   - API endpoints
   - User interface
   - Configuration options
   - Installation process

2. **Test your changes**:
   - Ensure the app builds successfully
   - Test on both iOS and Android if possible
   - Verify no security vulnerabilities introduced

3. **Submit your PR**:
   - Push your changes to your fork
   - Create a Pull Request from your fork to the main repository
   - Fill out the PR template with all relevant information
   - Link any related issues

4. **Code Review**:
   - Address any feedback from reviewers
   - Make requested changes in your feature branch
   - Push updates to your PR

## Areas for Contribution

### High Priority
- QR code scanning for addresses
- Biometric authentication (fingerprint/Face ID)
- Multiple language support
- Dark mode theme
- Improved error handling and user feedback

### Medium Priority
- Transaction filtering and search
- Export transaction history
- Multiple account management UI
- Custom token support
- Address book functionality

### Low Priority
- Custom themes
- Price tracking integration
- Push notifications for transactions
- Widget support

## Bug Reports

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Device and OS version
- App version

## Feature Requests

For new features:
- Check if the feature has already been requested
- Describe the feature and its benefits
- Explain how it should work
- Provide mockups or examples if possible

## Security Issues

**DO NOT** create public issues for security vulnerabilities!

Instead:
- Email security concerns directly to the maintainers
- Provide detailed information about the vulnerability
- Allow time for a fix before public disclosure

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discrimination of any kind
- Trolling or insulting comments
- Publishing others' private information
- Other conduct inappropriate for a professional setting

## Questions?

Feel free to:
- Create an issue for general questions
- Join community discussions
- Reach out to maintainers

## License

By contributing to Q-Mobile, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Q-Mobile! 🙏
