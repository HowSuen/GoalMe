import styled from "styled-components";

export const ListContainer = styled.TouchableOpacity`
  background-color: aliceblue;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

export const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 10px;
`;

export const TextDate = styled.Text`
  color: slateblue;
  font-size: 15px;
  margin-right: 20px;

  border-radius: 10px;
  width: 40px;
`;

export const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;

  height: 40px;

  border-radius: 10px;
`;

export const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 10px;
`;