// src/components/common/Breadcrumbs.js
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ title, items }) => {
  return (
    <Row>
      <Col>
        <h5>{title}</h5>
        <Breadcrumb>
          {items.map((item, index) => (
            <BreadcrumbItem key={index} active={item.active}>
              {item.active ? (
                item.label
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Col>
    </Row>
  );
};


export default Breadcrumbs;
