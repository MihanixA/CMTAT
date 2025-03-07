const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const { should } = require('chai').should()
const { ENFORCER_ROLE } = require('../utils')

function EnforcementModuleCommon (owner, address1, address2) {
  context('Freeze', function () {
    beforeEach(async function () {
      await this.cmtat.mint(address1, 50, { from: owner })
    })

    it('testAdminCanFreezeAddress', async function () {
      // Arrange - Assert
      (await this.cmtat.frozen(address1)).should.equal(false);
      // Act
      ({ logs: this.logs } = await this.cmtat.freeze(address1, {
        from: owner
      }));
      // Assert
      (await this.cmtat.frozen(address1)).should.equal(true)
      // emits a Freeze event
      expectEvent.inLogs(this.logs, 'Freeze', {
        enforcer: owner,
        owner: address1
      })
    })

    it('testEnforcerRoleCanFreezeAddress', async function () {
      // Arrange
      await this.cmtat.grantRole(ENFORCER_ROLE, address2, { from: owner });
      // Arrange - Assert
      (await this.cmtat.frozen(address1)).should.equal(false);
      // Act
      ({ logs: this.logs } = await this.cmtat.freeze(address1, { from: address2 }));
      // Assert
      (await this.cmtat.frozen(address1)).should.equal(true)
      // emits a Freeze event
      expectEvent.inLogs(this.logs, 'Freeze', {
        enforcer: address2,
        owner: address1
      })
    })

    it('testAdminCanUnfreezeAddress', async function () {
      // Arrange
      await this.cmtat.freeze(address1, { from: owner });
      // Arrange - Assert
      (await this.cmtat.frozen(address1)).should.equal(true);
      // Act
      ({ logs: this.logs } = await this.cmtat.unfreeze(address1, {
        from: owner
      }));
      // Assert
      (await this.cmtat.frozen(address1)).should.equal(false)
      expectEvent.inLogs(this.logs, 'Unfreeze', {
        enforcer: owner,
        owner: address1
      })
    })

    it('testEnforcerRoleCanUnfreezeAddress', async function () {
      // Arrange
      await this.cmtat.freeze(address1, { from: owner })
      await this.cmtat.grantRole(ENFORCER_ROLE, address2, { from: owner });
      // Arrange - Assert
      (await this.cmtat.frozen(address1)).should.equal(true);
      // Act
      ({ logs: this.logs } = await this.cmtat.unfreeze(address1, { from: address2 }));
      // Assert
      (await this.cmtat.frozen(address1)).should.equal(false)
      // emits an Unfreeze event
      expectEvent.inLogs(this.logs, 'Unfreeze', {
        enforcer: address2,
        owner: address1
      })
    })

    it('testCannotNonEnforcerFreezeAddress', async function () {
      await expectRevert(
        this.cmtat.freeze(address1, { from: address2 }),
        'AccessControl: account ' +
            address2.toLowerCase() +
            ' is missing role ' +
            ENFORCER_ROLE
      );
      // Assert
      (await this.cmtat.frozen(address1)).should.equal(false)
    })

    it('testCannotNonEnforcerUnfreezeAddress', async function () {
      // Arrange
      await this.cmtat.freeze(address1, { from: owner })
      // Act
      await expectRevert(
        this.cmtat.unfreeze(address1, { from: address2 }),
        'AccessControl: account ' +
            address2.toLowerCase() +
            ' is missing role ' +
            ENFORCER_ROLE
      );
      // Assert
      (await this.cmtat.frozen(address1)).should.equal(true)
    })
  })
}
module.exports = EnforcementModuleCommon
