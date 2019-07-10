import styled from 'styled-components';
import PropTypes from 'prop-types';

const input = (props) => {
  const { htmlFor, label } = props;

  return (
    <S.Input>
      <label htmlFor={htmlFor}>
        {label}
        <input {...props} />
      </label>

    </S.Input>
  );
};

export default input;

input.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const S = {};
S.Input = styled.div`
  & input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }
  & input {
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 6px 10px;
    box-sizing: border-box;

    :focus{
      outline: none;
      background-color: #ccc;
    }
  }
`;
