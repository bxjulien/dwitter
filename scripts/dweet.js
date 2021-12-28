const main = async () => {
  const dwittContractFactory = await hre.ethers.getContractFactory('Dwitter');
  const dwitterContract = await dwittContractFactory.deploy();
  await dwitterContract.deployed();
  console.log('Contract addy:', dwitterContract.address);

  let dweetCount;
  dweetCount = await dwitterContract.getTotalDweets();
  console.log(+dweetCount);

  let dweetTxn = await dwitterContract.postDweet('A message!');
  await dweetTxn.wait(); 

  const [_, randomPerson] = await hre.ethers.getSigners();
  dweetTxn = await dwitterContract.connect(randomPerson).postDweet('Another message!');
  await dweetTxn.wait(); 

  let allDweets = await dwitterContract.getAllDweets();
  console.log(allDweets);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();