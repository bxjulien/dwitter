const main = async () => {
  const dwittContractFactory = await hre.ethers.getContractFactory('Dwitter');
  const dwitterContract = await dwittContractFactory.deploy();
  await dwitterContract.deployed();
  console.log('Contract address:', dwitterContract.address);

  let dweetCount;
  dweetCount = await dwitterContract.getTotalDweets();
  console.log(+dweetCount);

  let tx = await dwitterContract.postDweet('A message!');
  await tx.wait(); 

  tx = await dwitterContract.postReply('reply', 0);
  await tx.wait(); 

  let allDweets = await dwitterContract.getAllDweets();
  allDweets.forEach(async d => {
    console.log('dweet', +d.id, d.text, d.isReply);
  })
  
  let reply = await dwitterContract.getReplies(0);
  console.log(reply[0].text, reply[0].isReply)
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