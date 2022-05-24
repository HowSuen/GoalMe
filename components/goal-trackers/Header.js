import React from "react";
import { ComponentContainer, HeaderText, HeaderList } from "./Header.style";

// let today = new Date().toISOString().slice(0, 10);

export default function Header() {
  return (
    <ComponentContainer>
      <HeaderText>Your Goals</HeaderText>
      {/* <HeaderList>{today}</HeaderList> */}
    </ComponentContainer>
  );
}