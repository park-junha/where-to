# Contributing to Where To

Thank you for contributing to Where To! Here you will find some guidelines on how to contribute:

- [Software Workflow](#workflow)

## <a name="workflow"></a> Software Workflow

Here is the workflow for contributing:

1. Issues are tracked with [GitHub Issues](https://github.com/park-junha/WhereTo/issues). Check them out and request to work on one of them.
2. Fork the repository and open a new branch off of the latest `master`. Please name the branch along the lines of `feature/<feature-name>` or `fix/<defect-name>`. Your changes should also include / revise unit tests where applicable (you can run `yarn test` to see if all tests pass).
3. When you are confident of your changes, rebase to the latest `park-junha:master`. Then, following semantic versioning, run `yarn bump patch` or `yarn bump minor`.
4. Open a pull request with the base branch set to `park-junha:master`. Please include in the description which issue your PR implements / closes.
