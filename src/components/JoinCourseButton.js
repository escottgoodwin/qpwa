import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';

import { COURSE_QUERY,STUDENT_COURSE_QUERY, JOIN_MUTATION } from '../ApolloQueries'


function JoinCourse(props) {
  // Declare a new state variable, which we'll call "count"

  const joinMutation = useMutation(JOIN_MUTATION, {
    variables: { courseId: course_id, inviteId  },
  });

  async function join(props) {
    let result;
    try {
      result = await joinMutation();
      console.log(result)
      props.history.push({pathname: `/student_dashboard`})
    } catch (error) {
      // error handler
    }
  }

  return (
    <div>
      <img src={url} />
      <Button style={{padding:10,marginTop:15,marginBottom:15}} fullWidth onClick={join} variant="contained" color="primary" size="small">Join</Button>
    </div>
  );
};
