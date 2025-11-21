import React, { PropsWithChildren } from "react";
import classnames from "classnames";

import styles from "./Container.module.css";

interface Props {
  className?: string;
  [key: string]: unknown;
}

const Container: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={classnames(className, styles.container)} {...props}>
      {children}
    </section>
  );
};

export default Container;
