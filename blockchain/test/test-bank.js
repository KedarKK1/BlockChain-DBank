const { expect } = require('chai');

describe('Bank App', () => {
    let bank, token, owner, address_1, address_2;
    let addresses;

    // before each single test we're going to run this function asynchronously using beforeEach
    beforeEach(async () => { 
        // we'll need to deploy bank contract before Token contract  
        const BankContract = await ethers.getContractFactory("Bank");
        bank = await BankContract.deploy();
        await bank.deployed();
        // above 3 lines are standard to deploy contract while testing
        
        const TokenContract = await ethers.getContractFactory("Token");
        token = await TokenContract.deploy(bank.address);
        await token.deployed();

        [owner, address_1, address_2, ...addresses] = await ethers.getSigners();
    });

    describe("Deployment", () => {
        //  below is syntax of mocha or chai
        
        // basically inside it, we check if this fields value is that or this state to that, etc etc all the things that validate SM, everything workds exactly we intended
        it("Should have a totalAssets of 0", async () => {
            // whenever we make a call to SM, it have to be asynchronous 
            expect(await bank.totalAssets()).to.equal("0");
            // below balanceOf exists in ERC20, so we didnt declared this in our token SM
            expect(await token.balanceOf(owner.address)).to.equal("0");
        });

        it("Should have 0 tokens, and 0 deposit in owner's account", async () => {
            expect(await bank.accounts(owner.address)).to.equal("0");
            expect(await token.balanceOf(owner.address)).to.equal("0");
        });

        it("Should have 0 tokens, and 0 deposit in address_1's account", async () => {
            expect(await bank.accounts(address_1.address)).to.equal("0");
            expect(await token.balanceOf(address_1.address)).to.equal("0");
        });

        it("Should have 0 tokens, and 0 deposit in address_2's account", async () => {
            expect(await bank.accounts(address_2.address)).to.equal("0");
            expect(await token.balanceOf(address_2.address)).to.equal("0");
        });
    })

    describe("Deposits and Withdrawl", () => {
        
        const oneEth = ethers.utils.parseEther("1.0");
        
        it("Should let owner deposit 1 ether, then the total asset will be 1 ether, and account[owner] should show 1 ether", async () => {
            await bank.connect(owner).deposit({ value: oneEth });
            expect(await bank.totalAssets()).to.equal(oneEth);
            expect(await bank.accounts(owner.address)).to.equal(oneEth);
        });

        it("Should let address_1 deposit & withdraw 1 ether, then have 1 FREE", async () => {
            await bank.connect(address_1).deposit({ value: oneEth });
            await bank.connect(address_1).withdraw(oneEth, token.address);
            expect(await bank.totalAssets()).to.equal("0");
            expect(await token.balanceOf(address_1.address)).to.equal(oneEth);
        });

        it("Should fail when trying to withdraw money that you havent deposited", async () => {
            // * Note - below commented will give you an error, be carefull about it
            // expect(await bank.connect(address_2).withdraw(oneEth, token.address)).to.be.revertedWith("Cannot withdraw more than deposited");
            await expect(bank.connect(address_2).withdraw(oneEth, token.address)).to.be.revertedWith("Cannot withdraw more than deposited");
        });

    })
})