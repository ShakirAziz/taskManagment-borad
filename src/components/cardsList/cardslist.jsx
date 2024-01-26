import { Grid } from "@mui/material";
import Card from "../card/card";
import { useState } from "react";

function CardsList() {
  const initialData = [[], [], [], []];
  const [order, setOrder] = useState(initialData.map(() => []));

  const handleMoveNext = (index) => {
    const updatedOrder = [...order];
    if (index < order.length - 1 && order[index].length > 0) {
      const movedItem = order[index][order[index].length - 1];
      updatedOrder[index] = order[index].filter(
        (_, i) => i !== order[index].length - 1
      );
      updatedOrder[index + 1].push(movedItem);
      setOrder(updatedOrder);
    }
  };

  const handleMovePrevious = (index) => {
    if (index > 0 && order[index].length > 0) {
      const movedItem = order[index].filter(
        (_, i) => i === order[index].length - 1
      )[0];
      setOrder((prevOrder) => {
        const updatedOrder = [...prevOrder];
        updatedOrder[index] = order[index].filter(
          (_, i) => i !== order[index].length - 1
        );
        updatedOrder[index - 1].push(movedItem);
        return updatedOrder;
      });
    }
  };

  // ...

  const handleAddCard = (index, newItem) => {
    setOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];
      updatedOrder[index].push(newItem);
      return updatedOrder;
    });
  };

  return (
    <Grid container spacing={1}>
      {[1, 2, 3, 4].map((index) => (
        <Card
          cardTitle={
            index === 1
              ? "To Do"
              : index === 2
              ? "In Progress"
              : index === 3
              ? "Review"
              : "Done"
          }
          key={index}
          placement={index}
          onHandleAdd={(newItem) => handleAddCard(index - 1, newItem)}
          onHandlePrev={() => handleMovePrevious(index - 1)}
          onHandleNext={() => handleMoveNext(index - 1)}
          data={order[index - 1]}
        />
      ))}
    </Grid>
  );
}

export default CardsList;
