const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const { PAUSER_ROLE } = require('../../utils')
const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const CMTAT = artifacts.require('CMTAT')
const { deployProxy } = require('@openzeppelin/truffle-upgrades')
const AuthorizationModuleCommon = require('../../common/AuthorizationModuleCommon')
contract(
  'AuthorizationModule',
  function ([_, owner, address1, address2, address3, fakeRuleEngine]) {
    beforeEach(async function () {
      this.cmtat = await CMTAT.new(_, { from: owner })
      this.cmtat = await deployProxy(CMTAT, [owner, 'CMTA Token', 'CMTAT', 'CMTAT_ISIN', 'https://cmta.ch'], { initializer: 'initialize', constructorArgs: [_] })
    })

    AuthorizationModuleCommon(owner, address1, address2)
  }
)
