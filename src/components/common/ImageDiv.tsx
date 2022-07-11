import Image, { ImageProps } from 'next/image';

function ImageDiv(props: ImageProps) {
  const { alt = '', className, ...rest } = props;

  return (
    <div className={className}>
      <Image {...rest} alt={alt} />
    </div>
  );
}

export default ImageDiv;
