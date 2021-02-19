import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./episode.css";
import { useHistory } from "react-router";

function Episode(props) {
  const history = useHistory();
  function handleClick() {
    history.push({ pathname: `/episode/${props.id}` });
  }
  return (
    <Card className="p-3">
      <Card.Header>{props.name}</Card.Header>
      <Card.Body>
        <Card.Title>{props.episode}</Card.Title>
        <Card.Text>Air Date: {props.air_date}</Card.Text>
        <Button variant="primary" onClick={handleClick}>
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Episode;
