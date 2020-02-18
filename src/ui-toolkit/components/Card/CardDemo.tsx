import React from "react";
import Card from "./Card";
import styled from "styled-components";
import { useView, Compiler, Editor, Error, ActionButtons } from "react-view";
import presetTypescript from "@babel/preset-typescript";
export default function CardDemo() {
  const params = useView({
    initialCode: `
<Card>
  <Card.Image size={200} src="https://s27363.pcdn.co/wp-content/uploads/2017/09/Zebra-Slot-Canyon.jpg.optimal.jpg" />
  <Card.Title>I am a card</Card.Title>
  <Card.Description>You can put whatever you want in a card</Card.Description>
  <Card.Footer>
    <Card.Info>Andrew Petersen</Card.Info>
    <Card.Info>12/3/2019</Card.Info>
  </Card.Footer>
</Card>
    `,
    scope: { Card: Card, items: [{ title: "title one" }] },
    onUpdate: console.log
  });
  return (
    <>
      <React.Fragment>
        <div style={{ margin: "10px 0" }}>
          <Compiler {...params.compilerProps} presets={[presetTypescript]} />
        </div>
        <Editor {...params.editorProps} language="tsx" />
        <Error {...params.errorProps} />
        <ActionButtons {...params.actions} />
      </React.Fragment>
      <StyledCardGrid>
        <Card>
          <div>hello, I am the most basic card you can imagine</div>
        </Card>

        <Card>
          <Card.Title>I am a default title</Card.Title>
        </Card>

        <Card centered>
          <Card.Title>I am a centered card</Card.Title>
        </Card>

        <Card>
          <Card.Title as="h1" className="big-title">
            I am a big title
          </Card.Title>
        </Card>

        <Card>
          <Card.Title url="#">I am a clickable title</Card.Title>
        </Card>

        <Card>
          <Card.Title url="https://skyline.visualstudio.com/">
            I am an external link
          </Card.Title>
          <Card.Description>I should open in a new tab</Card.Description>
        </Card>

        <Card>
          <Card.Title>Card w/ Tags as Sub Components</Card.Title>
          <Card.Tags>
            <Card.Tag>Explicit Tag</Card.Tag>
            <Card.Tag url="#">Clickable Tab</Card.Tag>
          </Card.Tags>
        </Card>

        <Card>
          <Card.Tags
            tags={[
              { label: "ReadOnly Tag" },
              { label: "Clickable Tag", url: "#" }
            ]}
          />
          <Card.Title>Card w/ Tags as prop</Card.Title>
          <Card.Description>
            This card passes the tags in as an array of objects with a label and
            a url.
          </Card.Description>
        </Card>

        <Card>
          <Card.Title>Card with metadata</Card.Title>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card.Info>Jan 2, 2018</Card.Info>
            <Card.Info>35 views</Card.Info>
          </div>

          <Card.Description>
            This card displays some metadata values in grey text
          </Card.Description>
        </Card>

        <Card>
          <Card.Title>Card with metadata in Footer</Card.Title>

          <Card.Description>
            This card displays some metadata values in grey text inside the card
            footer.
          </Card.Description>

          <Card.Footer>
            <Card.Info>Jan 2, 2018</Card.Info>
            <Card.Info>35 views</Card.Info>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Image src="https://picsum.photos/id/915/200/300"></Card.Image>
          <Card.Title>Some Beautiful Trees</Card.Title>
          <Card.Description>
            Basic example of showing an image on a card
          </Card.Description>
        </Card>

        <Card>
          <Card.Image
            src="https://picsum.photos/id/915/200/300"
            url="https://picsum.photos/id/915/200/300"
          ></Card.Image>
          <Card.Title>Some Beautiful Trees with a clickable image</Card.Title>

          <Card.Description>
            Shows how you can pass a url prop to the image so it gets rendered
            as a link
          </Card.Description>
        </Card>

        <Card>
          <Card.Image
            src="https://picsum.photos/id/915/200/300"
            size={250}
          ></Card.Image>
          <Card.Title>Some Beautiful Trees w/ an explicit size</Card.Title>

          <Card.Description>
            This is an example of using the size prop on an image to control the
            height of the image.
          </Card.Description>
        </Card>

        <Card>
          <Card.Title url="https://picsum.photos/id/915/200/300">
            Trees with the title above the image
          </Card.Title>
          <Card.Image
            url="https://picsum.photos/id/915/200/300"
            src="https://picsum.photos/id/915/200/300"
          ></Card.Image>
          <Card.Tags
            tags={[
              { label: "ReadOnly Tag" },
              { label: "Clickable Tag", url: "#" }
            ]}
          />
          <Card.Description>
            Shows how you can choose to put something on top of the image.
          </Card.Description>
          <Card.Footer>
            <Card.Info>Jan 2, 2018</Card.Info>
            <Card.Info>35 views</Card.Info>
          </Card.Footer>
        </Card>
      </StyledCardGrid>
    </>
  );
}

const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const StyledPre = styled.pre`
  background: #444;
  color: #eee;
  font-size: 12px;
  padding: 10px;
`;

const getCodeStr = function(cardCode: string) {
  return `
<div style={{ width:"100%", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "10px" }}>
`;
};
