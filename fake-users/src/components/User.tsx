function User(props: any) {
    return (
      <>
          <tr>
            <td>{props.number}</td>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.address}</td>
            <td>{props.phone}</td>
          </tr>
      </>
    )
  }
  
  export default User