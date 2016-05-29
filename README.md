# Octopeer for Bitbucket
**Latest Build**

[![wercker status](https://app.wercker.com/status/58d7606deea2e9a573c66d7fd5f57ef4/s "wercker status")](https://app.wercker.com/project/bykey/58d7606deea2e9a573c66d7fd5f57ef4)
[![Coverage Status](https://coveralls.io/repos/bitbucket/CasBs/ooc-octopeer/badge.svg?branch=develop)](https://coveralls.io/bitbucket/CasBs/ooc-octopeer?branch=develop)

[![wercker status](https://app.wercker.com/status/58d7606deea2e9a573c66d7fd5f57ef4/m "wercker status")](https://app.wercker.com/project/bykey/58d7606deea2e9a573c66d7fd5f57ef4)

**Latest Release**

[![Coverage Status](https://coveralls.io/repos/bitbucket/CasBs/ooc-octopeer/badge.svg?branch=master)](https://coveralls.io/bitbucket/CasBs/ooc-octopeer?branch=master)


## Setting up / building
Install *NodeJS* from [here](https://nodejs.org)

Make sure *gulp* is globally installed, if not: install using npm:
```
npm install -g gulp
```
Also, in order to compile things, get *typings*:
```
npm install -g typings
```
And use it to install the typings for _chrome_ and _jasmine_:
```
typings install
```

Install other dependencies:
```
npm install
```

## Gulp
A few commands can be executed using gulp:

- *Compile* convert typescript to javascript
- *Test*: Run the test suite
- *Lint*: Run the style-checker
- *Build*: Build the code, it converts .ts files into .js files

You can view the code coverage as measured in `target/assets/unit-test-coverage/html-report`

### Using the result
Load the `dest` folder in chrome:

- Go to `extensions` (or your regional equivalent)
- Make sure `Developer Mode` is enabled
- Load unpacked extension
- Choose `dest` folder

# Software Engineering Documentation

## Sprint backlogs
- Sprint backlog 1, 22-04-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Backlogs/Sprint%20Backlog%20%231.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint backlog 1, version 1.1, 25-04-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Backlogs/Sprint%20backlog%20%231%20Version%201.1.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint backlog 2, 29-04-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Backlogs/Sprint%20Backlog%20%232.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint backlog 3, 06-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Backlogs/Sprint%20Backlog%20%233.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint backlog 4, 13-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Backlogs/Sprint%20Backlog%20%234.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint backlog 5, 20-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Backlogs/Sprint%20Backlog%20%235.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint backlog 6, 27-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Backlogs/Sprint%20Backlog%20%236.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)

## Sprint retrospectives
- Sprint retrospective 1, 29-04-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Retrospectives/Sprint%20Retrospective%20%231.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint retrospective 2, 06-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Retrospectives/Sprint%20Retrospective%20%232.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint retrospective 3, 13-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Retrospectives/Sprint%20%20Retrospective%20%233.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint retrospective 4, 20-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Retrospectives/Sprint%20Retrospective%20%234.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Sprint retrospective 5, 27-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Retrospectives/Sprint%20Retrospective%20%235.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)


## Other documentation

- Class Diagram, 27-05-2016: [here](https://drive.google.com/file/d/0Byx_cnrHIK23TXktNjRQYVNXOHM/view?usp=sharing)
- Product Architecture C0.5, 27-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Architecture/Product%20Architectural%20Design%20C0.5.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Product Planning V1.0, 03-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Planning/Product%20Planning%20V1.0.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Product Vision V1.0, 03-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Vision/Product%20Vision%20V1.0.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Coding Choices Motivation, 27-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Architecture/Coding%20Choices%20Clarification.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)
- Tooling Choices Motivation, 20-05-2016: [here](https://bitbucket.org/CasBs/ooc-octopeer/src/1dfb0a9efb1f193434ee81f8fc007b321540fadd/doc/Architecture/Tooling%20Choices%20Clarification.pdf?at=release%2Fsprint-5&fileviewer=file-view-default)


# Detailed repository information #
[![wercker status](https://app.wercker.com/status/58d7606deea2e9a573c66d7fd5f57ef4/m "wercker status")](https://app.wercker.com/project/bykey/58d7606deea2e9a573c66d7fd5f57ef4)