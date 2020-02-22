import * as React from 'react';
import { connect } from 'react-redux';
import Card from 'reactstrap/lib/Card';
import CardImg from 'reactstrap/lib/CardImg';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import CardText from 'reactstrap/lib/CardText';
import Button from 'reactstrap/lib/Button';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Component } from 'react';
import { ApplicationState } from '../store';
import * as GameStore from '../store/Game';
import { RouteComponentProps } from 'react-router';

type GameProps =
    GameStore.GameState
    & typeof GameStore.actionCreators

class Home extends React.PureComponent<GameProps> {
    state = {
        gameType: 'hero'
    };
   
    public render() {
        return (
            <React.Fragment>
                {this.renderCardsTable()}
            </React.Fragment>
        );
    }

    handleClick = (player: number) => {
        if (player == 1 && this.props.playerOneCard.value == 0) {
            this.props.requestPlayerOneRandomCard(this.state.gameType)
        } else if (player == 2 && this.props.playerTwoCard.value == 0) {
            this.props.requestPlayerTwoRandomCard(this.state.gameType)
        }
    }

    changeGameType = (event: React.FormEvent<HTMLSelectElement>) => {
        var safeSearchTypeValue: string = event.currentTarget.value;
        this.setState({
            gameType: safeSearchTypeValue
        });
        this.props.reset();
    }

    private renderCardsTable() {
        return (
            <div>
                <h1>Lets play a game !</h1>
                <p>Welcome to sf card game. Choose cards type and play.</p>
                <div>
                    <label className="mr-1">Select cards type :</label>
                    <select onChange={this.changeGameType}>
                        <option key="hero" value="hero">hero</option>
                        <option key="starship" value="starship">starship</option>
                    </select>
                </div>
                <Button style={{ visibility: this.props.GameEnded ? 'visible' : 'hidden' }} onClick={() => this.props.reset()} color="primary">play again</Button>{' '}
                <Row>
                    <Col sm="2">
                        <p>Player 1, 0 points</p>
                        <Button onClick={() => this.handleClick(1)} color="primary">draw a card</Button>{' '}
                        <Card style={{ width: '14rem', visibility: this.props.playerOneCard.value ? 'visible' : 'hidden' }} >
                            <CardImg top src={`../assets/${this.props.playerOneCard.imageUrl}`} width="100%" alt="" />
                            <CardBody>
                                <CardTitle>{this.props.playerOneCard.name}</CardTitle>
                                <CardSubtitle>Mass: {this.props.playerOneCard.value}kg</CardSubtitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <div style={{ color: 'green', fontSize: '1.5rem' }}>
                            {this.props.winnerLabel}
                        </div>
                    </Col>
                    <Col sm="2">
                        <p>Player 2, 0 points</p>
                        <Button onClick={() => this.handleClick(2)} color="primary">draw a card</Button>{' '}
                        <br/>
                        <Card style={{ width: '14rem', visibility: this.props.playerTwoCard.value ? 'visible' : 'hidden' }} >
                            <CardImg top src={`../assets/${this.props.playerTwoCard.imageUrl}`} width="100%" alt="" />
                            <CardBody>
                                <CardTitle>{this.props.playerTwoCard.name}</CardTitle>
                                <CardSubtitle>Mass: {this.props.playerTwoCard.value}kg</CardSubtitle>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.game,
    GameStore.actionCreators
)(Home as any);
