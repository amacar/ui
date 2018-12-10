import React, { ChangeEvent, Component, FormEvent } from 'react';

import styled from '_styled-components';
import { Button, Identicon } from 'atoms';
import { Copyable } from 'molecules';
import { borderRadius, scale } from 'Theme';
import Typography from 'Typography';

const Flex = styled.div`
  display: flex;
`;

const Content = styled.div`
  padding-left: ${scale(0)};
`;

const Title = styled(Typography)<{ clickable: boolean }>`
  display: inline;
  font-size: ${scale(1)};
  ${props => props.clickable && `cursor: pointer;`};
`;

Title.defaultProps = { as: 'div' };

const TitleInput = styled.input`
  background: ${props => props.theme.background};
  border: 0.125em solid ${props => props.theme.controlBorder};
  border-radius: ${borderRadius};
  color: ${props => props.theme.text};
  font: ${scale(1)} Lato, sans-serif;
  padding: 0;
`;

const ColoredIconButton = styled(Button)`
  color: #b5bfc7;
`;

const SubmitButton = styled(ColoredIconButton)`
  color: #1eb8e7;
`;

SubmitButton.defaultProps = { type: 'submit', icon: 'check' };

interface Props {
  address: string;
  title: string;
  onSubmit?(title: string): void;
  truncate?(text: string): string;
}

interface State {
  editing: boolean;
  title: string;
}

export class Address extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { editing: false, title: props.title };
  }

  public handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => this.setState({ title: value });

  public handleEditing = () => this.setState({ editing: true });

  public handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { title } = this.state;

    this.setState({ editing: false });
    onSubmit!(title);
  };

  public render() {
    const { address, onSubmit, truncate } = this.props;
    const { editing, title } = this.state;

    return (
      <Flex>
        <Identicon address={address} />

        <Content>
          {editing ? (
            <form onSubmit={this.handleSubmit}>
              <TitleInput
                value={title}
                onChange={this.handleChange}
                autoFocus={true} // eslint-disable-line jsx-a11y/no-autofocus
              />{' '}
              <SubmitButton />
            </form>
          ) : (
            <>
              <Title
                onClick={onSubmit && this.handleEditing}
                clickable={Boolean(onSubmit)}
              >
                {title}
              </Title>
              {onSubmit && (
                <>
                  {' '}
                  <ColoredIconButton
                    icon="pencil-alt"
                    onClick={this.handleEditing}
                  />
                </>
              )}
            </>
          )}
          <Copyable text={address} truncate={truncate} />
        </Content>
      </Flex>
    );
  }
}

export default Address;
