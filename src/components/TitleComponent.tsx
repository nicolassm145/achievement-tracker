import { useEffect } from 'react';

interface Props {
  title: string;
}

const TitleComponent = (props: Props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return null;
};

export default TitleComponent;
