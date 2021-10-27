import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./launch.css";
import { useHistory } from "react-router";
import moment from "moment";

function Launch(props) {
  const history = useHistory();
  const date = moment(props.date_utc).format("YYYY/MM/DD h:mm A");

  function handleClick() {
    history.push({ pathname: `/launch/${props.id}` });
  }
  
  return (
    <Card className="p-3">
      <Card.Img variant="top" src={props.links.patch.large} />
      <Card.Header>{props.name}</Card.Header>
      <Card.Body>
        <Card.Title>{props.launch}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{props.details}</Card.Text>
        <Button variant="primary" onClick={handleClick}>
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Launch;
