import React from "react";
import { Button, Card } from "react-daisyui";

export interface CardProductProps {
  className?: string;
}

const CardProduct: React.FC<CardProductProps> = ({ ...args }) => {
  return (
    <Card {...args}>
      <Card.Image
        src="https://api.lorem.space/image/shoes?w=400&h=225"
        alt="Shoes"
        className="object-cover w-full h-48"
      />
      <Card.Body>
        <Card.Title tag="h2">Shoes!</Card.Title>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <Card.Actions className="justify-end">
          <Button color="primary">Buy Now</Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
