import styled from 'styled-components';
import PropTypes from 'prop-types';

const input = (props) => {
  const { error } = props;
  return (
    <S.Input>
      {/* This is an input and will be controlled input */}
      <input {...props} />
      <S.Showerror>{error}</S.Showerror>
    </S.Input>
  );
};

export default input;
input.propTypes = {
  error: PropTypes.string.isRequired,
};

const S = {};
S.Input = styled.div`
  margin-top: 10px;
  & input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
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
S.Showerror = styled.div`
  font-size: 12px;
  color: red;
`;
