// import { transparentize } from 'polished';
import * as React from 'react';

import styled from '../../styled-components';

import { UnderlinedHeader } from '../../common-elements/headers';
import { SecurityRequirementModel } from '../../services/models/SecurityRequirement';
import { linksCss } from '../Markdown/styled.elements';

const ScopeName = styled.code`
  font-size: ${props => props.theme.typography.code.fontSize};
  font-family: ${props => props.theme.typography.code.fontFamily};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  margin: 0 3px;
  padding: 0.2em;
  display: inline-block;
  line-height: 1;

  &:after {
    content: ',';
  }
  &:last-child:after {
    content: none;
  }
`;

const SecurityRequirementAndWrap = styled.span`
  &:after {
    content: ' AND ';
    font-weight: bold;
  }

  &:last-child:after {
    content: none;
  }

  ${linksCss};
`;

const SecurityRequirementOrWrap = styled.span`
  &:before {
    content: '( ';
    font-weight: bold;
  }
  &:after {
    content: ' ) OR ';
    font-weight: bold;
  }
  &:last-child:after {
    content: ' )';
  }

  &:only-child:before,
  &:only-child:after {
    content: none;
  }

  ${linksCss};
`;

export interface SecurityRequirementProps {
  security: SecurityRequirementModel;
}

export class SecurityRequirement extends React.PureComponent<SecurityRequirementProps> {
  render() {
    const security = this.props.security;
    return (
      <SecurityRequirementOrWrap>
        {security.schemes.map(scheme => {
          return (
            <SecurityRequirementAndWrap key={scheme.id}>
              <a href={'#' + scheme.sectionId}>{scheme.id}</a>
              {scheme.scopes.length > 0 && ' ('}
              {scheme.scopes.map(scope => <ScopeName key={scope}>{scope}</ScopeName>)}
              {scheme.scopes.length > 0 && ') '}
            </SecurityRequirementAndWrap>
          );
        })}
      </SecurityRequirementOrWrap>
    );
  }
}

const AuthHeaderColumn = styled.td``;

const SecuritiesColumn = styled.td`
  width: ${props => props.theme.schema.defaultDetailsWidth};
`;

const AuthHeader = UnderlinedHeader.extend`
  display: inline-block;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: inherit;
`;

export interface SecurityRequirementsProps {
  securities: SecurityRequirementModel[];
}

export class SecurityRequirements extends React.PureComponent<SecurityRequirementsProps> {
  render() {
    const securities = this.props.securities;
    if (!securities.length) {
      return null;
    }
    return (
      <Table>
        <tbody>
          <tr>
            <AuthHeaderColumn>
              <AuthHeader>Authorizations: </AuthHeader>
            </AuthHeaderColumn>
            <SecuritiesColumn>
              {securities.map((security, idx) => (
                <SecurityRequirement key={idx} security={security} />
              ))}
            </SecuritiesColumn>
          </tr>
        </tbody>
      </Table>
    );
  }
}
