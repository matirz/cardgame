import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as CardsStore from '../store/Cards';

// At runtime, Redux will merge together...
type CardsProps =
  CardsStore.CardsState // ... state we've requested from the Redux store
  & typeof CardsStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class FetchData extends React.PureComponent<CardsProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Cards</h1>
        <p>Heroes and starships.</p>
        {this.renderCardsTable()}
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestCards(startDateIndex);
  }

  private renderCardsTable() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Descritpion</th>
            <th>Image</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cards.map((card: CardsStore.Card) =>
              <tr key={card.name}>
                  <td>{card.name}</td>
                  <td>{card.description}</td>
                  <td>{card.imageUrl}</td>
                  <td>{card.value}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  private renderPagination() {
    const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

    return (
      <div className="d-flex justify-content-between">
        <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
        {this.props.isLoading && <span>Loading...</span>}
        <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.cards, // Selects which state properties are merged into the component's props
  CardsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any);
