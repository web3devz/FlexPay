// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

contract Payments {
    struct Client {
        address clientAddress;
        string clientName;
        uint256 treasury;
    }

    struct Freelancer {
        address freelancerAddress;
        address clientAddress;
        uint256 weeklyWageWei;
        uint256 weeksWorked;
        uint8 worldidverified;
        string activity;
    }

    mapping(address => Client) public clients;
    mapping(address => Freelancer) public freelancers;
    address[] public freelancerAddresses; // Array to store freelancer addresses

    event ClientAdded(address indexed clientAddress, string clientName);
    event ClientFunded(address indexed clientAddress, uint256 amount);
    event FreelancerAdded(address indexed freelancerAddress, address indexed clientAddress, uint256 weeklyWageWei, string activity);
    event WeeksWorkedUpdated(address indexed freelancerAddress, uint256 weeksWorked);
    event PayoutMade(address indexed freelancerAddress, uint256 amount);
    event FreelancerVerified(address indexed freelancerAddress);

    function addClient(string memory _clientName) public {
        clients[msg.sender] = Client({
            clientAddress: msg.sender,
            clientName: _clientName,
            treasury: 0
        });
        emit ClientAdded(msg.sender, _clientName);
    }

    function fundClient() public payable {
        Client storage client = clients[msg.sender];
        client.treasury += msg.value;
        emit ClientFunded(msg.sender, msg.value);
    }

    function addFreelancer(address _freelancerAddress, uint256 _weeklyWageWei, string memory _activity) public {
        freelancers[_freelancerAddress] = Freelancer({
            freelancerAddress: _freelancerAddress,
            clientAddress: msg.sender,
            weeklyWageWei: _weeklyWageWei,
            weeksWorked: 2,
            worldidverified: 0,
            activity: _activity
        });

        Client storage client = clients[msg.sender];
        client.treasury += 90000000000000000;
        freelancerAddresses.push(_freelancerAddress); // Add freelancer address to array
        emit FreelancerAdded(_freelancerAddress, msg.sender, _weeklyWageWei, _activity);
    }

    function updateWeeksWorked(address _freelancerAddress, uint256 _weeksWorked) public {
        Freelancer storage freelancer = freelancers[_freelancerAddress];
        freelancer.weeksWorked = _weeksWorked;
        emit WeeksWorkedUpdated(_freelancerAddress, _weeksWorked);
    }

    function payout(address _freelancerAddress) public {
        Freelancer storage freelancer = freelancers[_freelancerAddress];
        Client storage client = clients[freelancer.clientAddress];

        uint256 payoutAmount = freelancer.weeklyWageWei * freelancer.weeksWorked;

        require(client.treasury >= payoutAmount, "Insufficient funds in client treasury");
        require(address(this).balance >= payoutAmount, "Insufficient ETH balance in contract");

        freelancer.weeksWorked = 0;
        client.treasury -= payoutAmount;

        // Safe transfer using .call instead of .transfer
        (bool success, ) = payable(freelancer.freelancerAddress).call{value: payoutAmount}("");
        require(success, "Transfer failed");

        emit PayoutMade(_freelancerAddress, payoutAmount);
    }

    function verifyFreelancer(address freelancerAccount) public {
        Freelancer storage freelancer = freelancers[freelancerAccount];
        require(freelancer.freelancerAddress != address(0), "Freelancer does not exist");

        freelancer.worldidverified = 1;
        emit FreelancerVerified(freelancerAccount);
    }

    // Add receive function to accept Ether
    receive() external payable {}

    // Function to get the details of a client
    function getClient(address clientAddress) public view returns (Client memory) {
        return clients[clientAddress];
    }

    // Function to get the details of a freelancer
    function getFreelancer(address freelancerAddress) public view returns (Freelancer memory) {
        return freelancers[freelancerAddress];
    }

    // Function to get the details of all freelancers
    function getFreelancers() public view returns (Freelancer[] memory) {
        Freelancer[] memory allFreelancers = new Freelancer[](freelancerAddresses.length);
        for (uint256 i = 0; i < freelancerAddresses.length; i++) {
            allFreelancers[i] = freelancers[freelancerAddresses[i]];
        }
        return allFreelancers;
    }
}
