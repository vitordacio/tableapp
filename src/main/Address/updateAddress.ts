function UpdateAddressControllerFactory() {
  const updateAddressController = new UpdateAddressController();

  return updateAddressController;
}

const updateAddressController = UpdateAddressControllerFactory();

export { updateAddressController };
