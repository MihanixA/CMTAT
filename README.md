# CMTA Token 

The CMTA Token (CMTAT) is a framework enabling the tokenization of
equity and debt securities in compliance with the Swiss law.

The CMTAT is an open standard from the the [Capital Markets and
technology association](http://www.cmta.ch/) (CMTA), and the product of
collaborative work by leading organizations in the Swiss finance and
technology ecosystem.

The present repository provides CMTA's reference implementation of CMTAT
for Ethereum, as an ERC-20 compatible token.

The preferred way to receive comments is through the GitHub issue
tracker.  Private comments and questions can be sent to the CMTA secretariat 
at <a href="mailto:admin@cmta.ch">admin@cmta.ch</a>.


## Functionality

The CMTAT supports the following core features:

* Basic mint, burn, and transfer operations
* Forced transfer by the issuer 
* Pause of the contract and freeze of specific accounts

Furthermore, the present implementation uses standard mechanisms in order to simplify:

* Distribution of dividends and interest, via snapshots
* Upgradeability, via deployemnt of the token with a proxy
* "gasless" transactions

This reference implementation allows the issuance and management of
tokens representing company equity.
A future variant version will include attributes to fully support debt
instruments.

To use the CMTAT, we recommend that you use the latest audited version,
from the [Releases](https://github.com/CMTA/CMTAT/releases) page.

You may modify the token code by adding, removing, or modifying
features. However, the base, enforcement, and snapshot modules must
remain in place for compliance with the Swiss law.

## Documentation

Please see the [modules documentation](doc/modules) for the
specification of modules of this reference implementation (yet to be
fully aligned with the code).

CMTA will release further documentation describing the CMTAT framework
in a platform-agnostic way, and coveging legal aspects.


## Running local tests

Tests are written in JavaScript (Node.js package) and run with Truffle through the command `truffle test`. 
The test suite could be correctly built and run with the following versions: 

* Node.js 10.13.0
* npm 6.4.1
* Truffle 5.3.8

Truffle has to be installed globally or used with the `npx` command.
Everything else needed is installed through `npm install` with the right
versions.

Please see the Truffle [JavaScript tests
documentation](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript)
for more information about the writing and running of Truffle tests.

## Deployment via a proxy

The CMTAT supports deployment via a proxy, as it takes the requirements
for use with a proxy in consideration.  Furthermore, by using a proxy,
you can also upgrade the contract using a proxy upgrade pattern.

Please see the OpenZeppelin [upgradeable contracts
documentation](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)
for more information about the proxy requirements applied to the
contract.

Please see the OpenZeppelin [Upgrades
plugins](https://docs.openzeppelin.com/upgrades-plugins/1.x/) for more
information about upgrades plugins in general.

Note that the deployment via a proxy is not mandatory, but recommended by CMTA.

## Support for gasless transactions

The CMTAT supports client-side gasless transactions using the [Gas
Station Network](https://docs.opengsn.org/#the-problem) pattern, the
main open standard for transfering fee payment to another account than
the transaction issuer. The contract uses the OpenZeppelin contract
`ERC2771ContextUpgradeable`, which allows to get the original client
with `_msgSender()` instead of the fee payer given by `msg.sender` while
allowing upgrades on the main contract (see *Deployment via a proxy*
above).

Please see the OpenGSN
[documentation](https://docs.opengsn.org/contracts/#receiving-a-relayed-call)
for more details on what is done to support GSN in the contract.

## Security 

### Audits

The contracts have been audited by [ABDK
Consulting](https://www.abdk.consulting/), a globally recognized
firm specialized in smart contracts' security.

Fixes of security issues discovered by the initial audit were reviewed
by ABDK and confirmed to be effective, as certified by the [report
released](doc/audits/ABDK-CMTAT-audit-20210910.pdf) on September 10, 2021],
covering [version
c3afd7b](https://github.com/CMTA/CMTAT/tree/c3afd7b4a2ade160c9b581adb7a44896bfc7aaea)
of the contracts.
Version [0.2](https://github.com/CMTA/CMTAT/releases) includes
additional fixes of minor issues, compared to the version retested.

### Guidelines

As with any token contract, access to the owner key must be adequately
restricted.
Likewise, access to the proxy contract must be restricted and
seggregated from the token contract.


## Contributors

The CMTAT is developed by a working group of CMTA's Technical Committee
that includes members from Atpar, Bitcoin Suisse, Blockchain Innovation
Group, Hypothekarbank Lenz & Staehelin, Metaco, SEBA, Swissquote,
Sygnum, Taurus, Tezos Foundation.

The design and security of the CMTAT was supported by
[ABDK](https://abdk.consulting/), a leading team in smart contract
security.

## Intellectual property

The code is copyright (c) Capital Market and Technology Association,
2018-2021, and is released under [Mozilla Public License
2.0](./LICENSE.md).


