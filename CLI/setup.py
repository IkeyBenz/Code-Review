from setuptools import setup

setup(
    name = 'codereview',
    version = '0.0.1',
    packages = ['codereview'],
    entry_points = {
        'console_scripts': [
            'codereview = codereview.__main__:main'
        ]
    }
)
