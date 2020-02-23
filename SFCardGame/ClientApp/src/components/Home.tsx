import * as React from 'react';
import { connect } from 'react-redux';
import Card from 'reactstrap/lib/Card';
import CardImg from 'reactstrap/lib/CardImg';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import Button from 'reactstrap/lib/Button';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { ApplicationState } from '../store';
import * as GameStore from '../store/Game';
import { Card as GameCard } from '../store/Game';

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

    private renderCard(card: GameCard) {
        return (
            <Card style={{ width: '14rem', visibility: card.value ? 'visible' : 'hidden' }} >
                <CardImg src={`../assets/${card.imageUrl}`} width="100%" alt="" />
                <CardBody>
                    <CardTitle>{card.name}</CardTitle>
                    <CardSubtitle>
                        {this.state.gameType == "hero" ? ("Mass: ") : ("Crew count: " )}
                        {card.value} </CardSubtitle>
                </CardBody>
            </Card>
        );
    }

    private renderCardsTable() {
        return (
            <div>
                <h1>Lets play a game !</h1>
                <p>Welcome to sf card game. Choose cards type and play.</p>
                <div>
                    <label>Select cards type :</label>
                    <select onChange={this.changeGameType}>
                        <option key="hero" value="hero">hero</option>
                        <option key="starship" value="starship">starship</option>
                    </select>
                </div>
                <Button style={{ visibility: this.props.GameEnded ? 'visible' : 'hidden' }} onClick={() => this.props.reset()} color="primary">play again</Button>{' '}
                <Row>
                    <Col sm="2">
                        <p>Player 1</p>
                        <Button onClick={() => this.handleClick(1)} color="primary">draw a card</Button>{' '}
                        {this.renderCard(this.props.playerOneCard)}
                    </Col>
                    <Col sm="3">
                        <div style={{ color: 'green', fontSize: '1.5rem' }}>
                            {this.props.winnerLabel}
                        </div>
                    </Col>
                    <Col sm="2">
                        <p>Player 2</p>
                        <Button onClick={() => this.handleClick(2)} color="primary">draw a card</Button>{' '}
                        {this.renderCard(this.props.playerTwoCard)}
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
