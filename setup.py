from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in real_estate_management/__init__.py
from real_estate_management import __version__ as version

setup(
	name="real_estate_management",
	version=version,
	description="Real Estate Management",
	author="arkayapps",
	author_email="info@arkayapps.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
