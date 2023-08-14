const Heading = (props: { title: string, className?: string }) => {
  const { title, className } = props;
  return (
    <h2 className={`text-center text-mwTextMobileH1Bold lg:text-mwTextDeskH1Bold text-mwGrey-900 ${className ? className : ""}`}>
      {title}
    </h2>
  );
};

export default Heading;
