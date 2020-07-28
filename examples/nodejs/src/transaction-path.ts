import { ethers } from 'ethers'
import { connect } from '@aragon/connect'

const ACCOUNT = '0xAF06950aa322877B640d9533163a19C739DA1a1D'

async function main() {
  const org = await connect('0xff0a9a0ceA8ee4e2d2b2dab31012c0794D32f4A4', 'thegraph', {chainId: 4})

  const finance = await org.app('finance')

  // Transaction intent
  const intent = org.appIntent(finance.address, 'newImmediatePayment', [
    ethers.constants.AddressZero,
    ACCOUNT,
    ethers.utils.parseEther('1'),
    'Tests Payment',
  ])
  console.log("intent", intent);

  // Transaction path
  const txPath = await intent.paths(ACCOUNT)
  console.log("TX Path man", txPath);
  txPath.transactions.map((tx: any) => console.log(tx))

  // Custom Tx Path
  const start = ["0x846829d989c15a2ef36e01aad0e9ae6a1f71305c", "0x9a21e988d43e78473933723f4fc30d6fb7874b2e"];
  const customPath = await intent.customPaths(ACCOUNT, start);
  console.log("Custom TX Path yo", customPath);
  customPath.transactions.map((tx: any) => console.log(tx))

  const start1 = ["token-manager", "voting"];
  const customPath1 = await intent.customPaths(ACCOUNT, start1);
  console.log("Custom TX Path yo", customPath1);
  customPath1.transactions.map((tx: any) => console.log(tx))

  const path = ["token-manager", "voting", "finance"];
  const customPath2 = await intent.checkPath(ACCOUNT, path);
  console.log("Custom TX Path yo", customPath2);
  customPath2.transactions.map((tx: any) => console.log(tx))


  const txPaths = await intent.allPaths(ACCOUNT)
  console.log("TX All Paths man", txPaths);
  // Transaction request
  for (let i = 0; i < txPaths.length; i++){
    txPaths[i].transactions.map((tx: any) => console.log(tx))
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(`Error: `, err)
    console.log(
      '\nPlease report any problem to https://github.com/aragon/connect/issues'
    )
    process.exit(1)
  })

