import * as React from 'react';
import { shallow } from 'enzyme';
import { Home } from './Home';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import CardTitle from 'reactstrap/lib/CardTitle';
import Button from 'reactstrap/lib/Button';

const fakeGame = {
    gameType: "starship", GameEnded: true, winnerLabel: "", playerOneCard: { description: "", imageUrl: "", name: "han solo", type: "", value: 55 }, playerTwoCard: { description: "", imageUrl: "", name: "vader", type: "", value: 80 }
};

it('1 check heroes rendered names', () => {
    const wrapper = shallow(<Home gameType={fakeGame.gameType} GameEnded={fakeGame.GameEnded} winnerLabel={fakeGame.winnerLabel} playerOneCard={fakeGame.playerOneCard} playerTwoCard={fakeGame.playerTwoCard}  />);
   
    expect(wrapper.find(CardTitle)).toHaveLength(2);
    expect(wrapper.find(CardTitle)).toHaveLength(2);
    expect(wrapper.find(CardTitle).at(0).shallow().text()).toBe("han solo");
    expect(wrapper.find(CardTitle).at(1).shallow().text()).toBe("vader");
});

it('1 check heroes rendered values', () => {
    const wrapper = shallow(<Home gameType={fakeGame.gameType} GameEnded={fakeGame.GameEnded} winnerLabel={fakeGame.winnerLabel} playerOneCard={fakeGame.playerOneCard} playerTwoCard={fakeGame.playerTwoCard} />);

    expect(wrapper.find(CardSubtitle)).toHaveLength(2);
    expect(wrapper.find(CardSubtitle)).toHaveLength(2);
    expect(wrapper.find(CardSubtitle).at(0).shallow().text()).toBe("Mass: 55");
    expect(wrapper.find(CardSubtitle).at(1).shallow().text()).toBe("Mass: 80");
});