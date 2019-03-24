from setuptools import setup, find_packages

with open("README.md", "r") as f:
  long_description = f.read()

setup(
    name = "codereview",
    version = "0.0.1",
    author="Isaac J. Benzaken",
    author_email="ikey.benz@gmail.com",
    description="The Command Line Interface for Code-Review.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/IkeyBenz/Code-Review/tree/master/CLI",
    packages = find_packages(),
    entry_points = {
        "console_scripts": [
          "codereview = codereview.__main__:main"
        ]
    }
)
