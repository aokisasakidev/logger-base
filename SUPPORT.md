# Support

Thank you for using logger-base! This document provides information on how to get help and support.

## Getting Help

### Documentation

- **README**: Check the [README.md](./README.md) for basic usage and examples
- **API Documentation**: TypeScript definitions are available in the `src/` directory
- **Changelog**: See [CHANGELOG.md](./CHANGELOG.md) for version history and changes

### Community Support

1. **GitHub Issues**: For bugs, feature requests, and general questions
   - [Open an issue](https://github.com/alphacointech1010/logger-base/issues/new)
   - Search existing issues first to avoid duplicates

2. **GitHub Discussions**: For community discussions and Q&A
   - [Start a discussion](https://github.com/alphacointech1010/logger-base/discussions)

### Before Asking for Help

Please provide the following information:

- **Version**: Which version of logger-base are you using?
- **Environment**: Node.js version, operating system
- **Code**: Minimal reproduction case
- **Error**: Full error message and stack trace
- **Expected**: What you expected to happen
- **Actual**: What actually happened

### Common Issues

#### Installation Problems

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Issues

Ensure you have the latest TypeScript definitions:

```bash
npm install --save-dev @types/node
```

#### Debug Output Not Showing

Make sure to set the DEBUG environment variable:

```bash
# Linux/macOS
DEBUG=* node your-app.js

# Windows
set DEBUG=* && node your-app.js
```

## Contributing

Want to contribute? See our [Contributing Guide](./CONTRIBUTING.md) for:

- Development setup
- Code style guidelines
- Pull request process
- Testing requirements

## Security Issues

For security vulnerabilities, please see our [Security Policy](./SECURITY.md) for responsible disclosure guidelines.

## Commercial Support

For commercial support, consulting, or custom development:

- Email: [josefrancisco.verdu@gmail.com](mailto:josefrancisco.verdu@gmail.com)
- Website: [https://alphacointech1010.com](https://alphacointech1010.com)

## Response Times

- **Bug reports**: We aim to respond within 48 hours
- **Feature requests**: Response within 1 week
- **Security issues**: Response within 24 hours
- **General questions**: Response within 1 week

## Supported Versions

We provide support for:

- **Current major version**: Full support with bug fixes and security updates
- **Previous major version**: Security updates only for 6 months after new major release

## Resources

- [npm package](https://www.npmjs.com/package/logger-base)
- [GitHub repository](https://github.com/alphacointech1010/logger-base)
- [Issue tracker](https://github.com/alphacointech1010/logger-base/issues)

Thank you for using logger-base!