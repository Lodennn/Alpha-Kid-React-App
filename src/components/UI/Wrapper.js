const Wrapper = (props) => {
  return (
    <section className={props.className}>
      <div className={props.container}>{props.children}</div>
    </section>
  );
};

export default Wrapper;
