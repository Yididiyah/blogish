import styled from 'styled-components';
import PropTypes from 'prop-types';
import device from '../../../../lib/device';

const input = (props) => {
  const { error } = props;
  let errorClass = null;
  if (error) {
    errorClass = 'error';
  }
  return (
    <S.Input>
      {/* This is an input and will be controlled input */}
      <input className={errorClass} {...props} />
      <div className="show-error">{error}</div>
    </S.Input>
  );
};

export default input;
input.propTypes = {
  error: PropTypes.string.isRequired,
};

const S = {};
S.Input = styled.div`
  box-sizing: border-box;
  margin-top: 1.2em;
  & input {
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 0.5em 1em;
    box-sizing: border-box;

    :focus{
      outline: none;
      background-color: #ccc;
    }
  }
  .error {
    border: 1px solid red;
  }
  .show-error {
      font-size: 1em;
      color: red;
    }
    @media ${device.desktop} {
      font-size: 1em;
      /* margin: 1em 2em; */
    } 
    @media ${device.mobile} {
      margin-top: 0.3em;
      margin-bottom: 0.8em;
    } 
`;
