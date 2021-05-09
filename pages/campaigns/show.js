import React, {Component} from 'react';
import {Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component{
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]

        };
    }

    renderCards(){
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                description:
                'The manager created this campaign, and can create requests to withdraw money',
                meta: 'Address of Campaign Manager',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                description:
                'You must contribute at least this amount of Wei to be an approver',
                meta: 'Minimum Contribution in Wei',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                description:
                'Number of requests to withdraw money from the contract. Requests must be approved by approvers',
                meta: 'Number of Withdraw Requests',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: approversCount,
                description:
                'Number of people who have donated more than the minimum contribution amount and are now approvers',
                meta: 'Number of Approvers',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                description:
                'The balance is how much money the campaign has left to spend',
                meta: 'Balance of Campaign in ETH',
                style: {overflowWrap: 'break-word'}
            },
        ];
        return <Card.Group items={items}/>;
    }


    render(){
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;