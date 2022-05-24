import React from "react";
import { ComponentContainer, EmptyImage, EmptyText } from "./Empty.style";

export default function Empty() {
  return (
    <ComponentContainer>
      <EmptyImage source={require("../../assets/Barry-B-Benson.png")} />
      <EmptyText>There's nothing to do.</EmptyText>
    </ComponentContainer>
  );
}
