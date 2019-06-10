import gql from "graphql-tag";

export const ADD_COURSE_MUTATION = gql`
  mutation AddCourse(
    $name: String!,
    $time:String,
    $schoolId: String,
    $institutionId: ID!,
    $department1: String
  ){
    addCourse(
      name: $name,
      time: $time,
      deleted: false,
      courseNumber: $schoolId,
      institutionId: $institutionId,
      department1: $department1
    ){
    id
    name
    time
    deleted
    institution{
      id
      name
    }
    students{
      id
    }
    tests{
      id
      panels{
        id
      }
    }
  }
}
`

export const TEST_CHALLENGE_QUERY = gql`
query TestChallenges($testId:ID!){
  test(id:$testId){
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
    }
  }
`

export const CHALLENGE_DASHBOARD_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      questions{
        id
        challenges{
          id
          challenge
          addedBy{
            id
            firstName
            lastName
          }
          challengeMessages{
            id
            challengeMessage
            addedDate
            addedBy{
              id
              firstName
              lastName
            }
          }
          question{
            id
            question
            choices{
              id
              correct
              choice
            }
						questionAnswers{
              id
              addedBy{
                id
                firstName
              }
              answer{
                id
                choice
              }
            }
            panel{
              id
              link
            }
            addedBy{
              id
              firstName
              lastName
            }
          }

        }
      }

    }
}
`

export const CHALLENGE_DASHBOARD_STUDENT_QUERY = gql`
query ChallengeTestQuery($testId:ID!, $userId:ID!){
challenges(where:{AND:[{answer:{question:{test:{id:$testId}}}},{addedBy:{id:$userId}}]},orderBy:addedDate_DESC){
  challenges{
    id
    challenge
    addedDate
    addedBy{
      id
      firstName
      lastName
    }
    answer{
      id
      answer{
        id
        choice
      }
      question{
        id
        question
        addedDate
        addedBy{
          id
          firstName
          lastName
        }
        test{
          subject
        }
      }
    }
    answer{
      id
      question{
        id
        panel{
          id
          link
        }
        question
        addedDate
        addedBy{
          id
          firstName
          lastName
        }
      }
    }
  }
}
}
`

export const CHALLENGE_DASHBOARD2_QUERY = gql`
query ChallengeTestQuery($testId:ID!){
  challenges(where:{answer:{question:{test:{id:$testId}}}},orderBy:addedDate_DESC){
    challenges{
      id
      challenge
      addedDate
      addedBy{
        id
        firstName
        lastName
      }
      answer{
        id
        answer{
          id
          choice
        }
        question{
          id
          question
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
          choices{
            id
            choice
          }
        }
      }
      answer{
        id
        question{
          id
          panel{
            id
            link
          }
          question
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
        }
      }
    }
  }
}
`

export const NEW_PANEL_SUBSCRIPTION = gql`
subscription NewPanelSubscription($testId:ID!){
  newPanel(testId:$testId){
    id
    panelLink
    total
    totalCorrect
    percentCorrect
    question
  }
}
`

export const CHALLENGE_MESSAGE_SUBSCRIPTION = gql`
  subscription ChallengeMsgSub($challengeId:ID!){
    challengeMsg(challengeId:$challengeId){
      node{
        id
        challengeMessage
        addedDate
        addedBy{
          id
          firstName
          lastName
        }
      }
    }
  }
  `

export const PERFORMANCE_CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  tests(where:{id:$test_id}){
    tests{
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      questions{
        id
        question
        addedBy{
          firstName
          lastName
        }
        challenges{
          id
          challenge
          addedBy{
            firstName
            lastName
          }
        }
      }
    }
  }
}
`

export const NEW_CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      panels{
        link
        id
      }
      }
    }
`
export const ADD_TEST_MUTATION = gql`
mutation AddTest(
  $subject:String!
  $testDate: DateTime,
  $testNumber: String,
  $testType: String!,
  $courseId:ID!){
    addTest(subject:$subject,
      testDate:$testDate,
      testNumber:$testNumber,
      testType: $testType,
      courseId:$courseId){
        id
      }
    }
    `

export const TEST_COURSE_QUERY = gql`
  query COURSE($course_id:ID!){
    course(id:$course_id){
      name
      courseNumber
      time
      department1
      id
    }
  }
  `
export const COURSE_QUERY = gql`
query CourseQuery($courseid:ID!){
  course(id:$courseid){
    id
    name
    courseNumber
    time
    institution{
      id
      name
    }
    tests{
      id
      subject
    }
    students{
      id
      firstName
      lastName
      email
    }
    teachers{
      id
      firstName
      lastName
      email
    }
    tests{
      id
      subject
      deleted
      testNumber
      release
      published
      testDate
      testType
      questions{
        id
        questionAnswers{
          id
          answerCorrect
        }
      }
      panels{
        id
      }
    }
  }
}
`

export const EDIT_COURSE_MUTATION = gql`
  mutation UpdateCourse(
    $name: String!,
    $time:String,
    $courseNumber: String,
    $department1: String
    $id:ID!
  ){
    updateCourse(
      name: $name,
      time: $time,
      courseNumber: $courseNumber,
      department1: $department1
      id:$id
    ){
    name
    time
    courseNumber
    department1
    id
  }
}
`

export const TEST_COURSE_MUTATION = gql`
  mutation UpdateTest(
    $subject: String!,
    $testDate: DateTime,
    $testNumber: String,
    $testType: String!,
    $id:ID!
  ){
    updateTest(
      subject: $subject,
      testDate: $testDate,
      testNumber: $testNumber,
      testType: $testType,
      id:$id
    ){
    id
    subject
    testNumber
    testDate
    testType
  }
}
`

export const SEND_INVITES_MUTATION = gql`
mutation SendInvites($emails:String,$course_id:ID!){
  sendInvite(emails:$emails,
    courseId:$course_id){
      authMsg
    }
}
`

export const COURSE_DASHBOARD_QUERY = gql`
query CourseQuery($courseid:ID!){
  course(id:$courseid){
    id
    name
    courseNumber
    time
    institution{
      id
      name
    }
    students{
      id
    }
    tests{
      id
      subject
      deleted
      testNumber
      release
      testDate
      course{
        id
        name
        courseNumber
      }
      questions{
        id
        questionAnswers{
          id
          challenge{
            id
            challenge
          }
        answer{
          id
          choice
          correct
        }
      }
      }
      panels{
        id
      }
    }
  }
}
`

export const TEACHER_DASHBOARD_QUERY = gql`
query UserQuery($userid: ID!) {
  user(id: $userid){
    id
    firstName
    lastName
    teacherCourses{
      id
      name
      time
      image
      deleted
      institution{
        id
        name
      }
      students{
        id
      }
      tests{
        id
        testType
        panels{
          id
        }
      }
    }
  }
}
`


export const STUDENT_COURSE_QUERY = gql`
query UserQuery($userid: ID!) {
  user(id: $userid){
    id
    firstName
    lastName
    invitesSentTo{
      id
      course{
        id
        courseNumber
        name
        time
        teachers{
          id
          firstName
          lastName
        }
        institution{
          id
          name
        }
      }
    }
    studentCourses{
      id
      name
      time
      image
      deleted
      institution{
        id
        name
      }
      teachers{
        id
        firstName
        lastName
      }
      tests{
        id
      }
    }
  }
}
`

export const DELETE_COURSE_MUTATION = gql`
  mutation DeleteCourse(
    $course_id: ID!,
  ){
    updateCourse(
      id: $course_id,
      deleted: true,
    ){
    name
    id
  }
}
`

export const TEST_EDIT_QUERY = gql`
  query TestQuery($test_id: ID!){
    test(id:$test_id){
      subject
      testDate
      testNumber
      id
      course {
        id
        name
        courseNumber
      }
  }
}
`

export const TEST_QUERY = gql`
query TestQuery($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      release
      releaseDate
      published
      publishDate
      startTime
      endTime
      endDate
      testType
      questions{
        id
      }
    	course{
        id
        name
        courseNumber
      }
      panels{
        link
        id
    }
    }
  }
`

export const MOBILE_LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!, $pushToken: String) {
    mobileLogin(email: $email, password: $password, pushToken: $pushToken) {
      token
      token
      user{
        id
        firstName
        lastName
        online
        role
        teacherInstitutions {
          id
          name
        }
        studentInstitutions {
          id
          name
        }
        adminInstitutions{
          id
          name
        }
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user{
      id
      firstName
      lastName
      online
      role
      teacherInstitutions {
        id
        name
      }
      studentInstitutions {
        id
        name
      }
      adminInstitutions{
        id
        name
      }
    }
  }
}
`

export const CONFIRMATION_MUTATION = gql`
  mutation ConfirmEmail($email:String!, $confirmationToken:String!){
    confirmEmail(email:$email,confirmationToken:$confirmationToken){
      authMsg
    }
  }
  `


export const PANEL_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
    id
      subject
      testNumber
      testDate
      testType
      course{
        id
        name
        courseNumber
      }
      panels{
        id
        link
        questions{
         question
         questionAnswers{
           answerCorrect
         }
        }
      }
   }
}
`
export const TEST_STATS_QUERY = gql`
query TestStats($testId:ID!,$courseId:ID!){
  userTestStats(testId:$testId,
  courseId:$courseId){
    name
    totalCorrect
    percentCorrect
    total
  }
}
`

export const DELETE_TEST_MUTATION = gql`
  mutation DeleteTest(
    $test_id: ID!,
  ){
    updateTest(
      id: $test_id,
      deleted: true,
    ){
    id
    course{
      id
    }
  }
}
`

export const CHALLENGE_TEST_QUERY = gql`
query ChallengeTestQuery($testId:ID!){
  challenges(where:{answer:{question:{test:{id:$testId}}}},orderBy:addedDate_DESC){
    challenges{
      id
      challenge
      addedDate
      addedBy{
        firstName
        lastName
      }
      answer{
        question{
          question
          addedDate
          addedBy{
            firstName
            lastName
          }
        }
      }
    }
  }
}
`

export const LOGOUT_MUTATION = gql`
  mutation {
    logout{
      authMsg
      user{
        online
        firstName
        lastName
      }
    }
  }
`

export const ADD_PANEL_MUTATION = gql`
mutation AddPanel($testId:ID!, $link:String!){
  addPanel(link:$link, testId:$testId){
    link
    label
    id
  }
}
  `

export const ADD_PANELS_MUTATION = gql`
  mutation AddPanels( $testId: ID!, $uploadsList: String! ){
    addPanels( uploadsList: $uploadsList, testId: $testId ){
        link
        id
        test{
          panels{
            id
            link
            }
          }
        }
      }
    `

export const PHOTO_LABEL_MUTATION = gql`
  mutation SendLink($testId:ID!, $link:String!, $label: String){
    addLabeledPhoto(link:$link, testId:$testId, label: $label){
      link
      id
      test{
        id
      }
    }
  }
  `

  export const TEST_QUESTION_STATS_QUERY = gql`
  query TestQuestionStats($testId:ID!){
    testQuestionStats(testId: $testId){
      question
      total
      totalCorrect
      percentCorrect
  }
  }
  `

export const USER_TEST_STATS_QUERY = gql`
query TestStats($testId:ID!, $courseId:ID!){
  userTestStats(testId: $testId,
  courseId: $courseId){
    name
    totalCorrect
    percentCorrect
    total
  }
}
`

export const TEST_STATS_PERFORMANCE_QUERY = gql`
query TestStats($testId:ID!){
  testStats(testId:$testId){
    total
    totalCorrect
    percentCorrect
  }
}
`

export const TEST_PANEL_STATS_QUERY = gql`
query PanelQuery($testId:ID!){
  testPanelStats(testId:$testId){
      id
      panelLink
      total
      totalCorrect
    	percentCorrect
      question
    }
  }
`

export const DELETE_PANEL = gql`
mutation DeletePanel($panelId:ID!){
  deletePanel(id:$panelId){
    id
  }
}
`

export const CHALLENGE_MESSAGE_QUERY = gql`
query ChallengeMessages($challengeId:ID!){
   challengeMessages(where:{challenge:{id:$challengeId}}){
    challengeMessages{
      id
      challengeMessage
      addedDate
      addedBy{
        id
        firstName
        lastName
      }
    }
  }
}
`

export const ADD_CHALLENGE_MESSAGE_MUTATION = gql`
mutation AddChallengeMessage($challengeId: ID!, $challengeMessage: String!) {
  addChallengeMessage(challengeMessage: $challengeMessage,
  challengeId: $challengeId){
    addedBy{
      firstName
    }
    challengeMessage
    challenge{
      answer{
        answer{
          choice
        }
      }
    }
  }
}
`

export const USER_INSTITUTION_QUERY = gql`
query UserInstition($userid:ID!){
user(id:$userid){
  teacherInstitution{
    id
    name
  }
}
}
`

export const RELEASE_QUESTIONS_MUTATION = gql`
  mutation ReleaseQuestions(
    $test_id: ID!
    $releaseDate: DateTime
  ){
    updateTest(
      id: $test_id,
      release:true,
      releaseDate: $releaseDate
    ){
    id
    course {
      id
    }
  }
}
`

export const PANEL_COUNT_SUBSCRIPTION = gql`
subscription PanelCountSubscription($testId:ID!){
	panelCount(testId:$testId){
    count
  }
}
`

export const PANEL_COUNT_QUERY = gql`
query PanelCountQuery($testId:ID!){
  panels(where:{test:{id:$testId}}){
    count
  }
}
`

export const QUESTION_COUNT_SUBSCRIPTION = gql`
subscription QuestionCountSubscription($testId:ID!){
	questionCount(testId:$testId){
    count
  }
}
`

export const QUESTION_COUNT_QUERY = gql`
query QuestionCountQuery($testId:ID!){
  questions(where:{test:{id:$testId}}){
    count
  }
}
`

export const ANSWER_COUNT_QUERY = gql`
query AnswerCountQuery($testId:ID!){
  answers(where:{question:{test:{id:$testId}}}){
    count
    answers{
      answer{
        correct
      }
    }
  }
}
`

export const CHALLENGE_COUNT_SUBSCRIPTION = gql`
subscription ChallengeCountSubscription($testId:ID!){
	challengeCount(testId:$testId){
    count
  }
}
`

export const CHALLENGE_COUNT_QUERY = gql`
query ChallengeCountQuery($testId:ID!){
  challenges(where:{answer:{question:{test:{id:$testId}}}}){
    count
  }
}
`

export const CHALLENGE_STUDENT_COUNT_QUERY = gql`
query ChallengeCountQuery($testId:ID!, $userId:ID!){
  challenges(where:{AND:[{answer:{question:{test:{id:$testId}}}},{addedBy:{id:$userId}}]},orderBy:addedDate_DESC){
    count
  }
}
`

export const ANSWER_STATS_SUBSCRIPTION = gql`
subscription AnswerStats($testId:ID!){
  answerCount(testId:$testId){
    total
    totalCorrect
    percentCorrect
  }
}
`

export const NEW_CHALLENGE_SUBSCRIPTION = gql`
subscription NewChallenge($testId:ID!){
  newChallenge(testId:$testId){
    node{
      id
      challenge
      addedDate
      addedBy{
        id
        firstName
        lastName
      }
      answer{
        id
        answer{
          id
          choice
        }
        question{
          id
          question
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
          choices{
            id
            choice
          }
        }
      }
      answer{
        id
        question{
          id
          panel{
            id
            link
          }
          question
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
        }
      }
    }
  }
}
  `

export const COURSE_STUDENT_QUERY = gql`
query CourseStudentsQuery($courseId:ID!){
  course(id:$courseId){
    id
    name
    courseNumber
    time
    students{
      id
      firstName
      lastName
      answers{
        id
        answerCorrect
      }
    }
    }
  }
`

export const NEW_COURSE_DASHBOARD_QUERY = gql`
query CourseDashboardQuery($courseId:ID!){
  courseDashboard1(courseId:$courseId){
    id
    name
    courseNumber
    time
    image
    deleted
    studentCount
    testCount
    courseTestList{
      id
      deleted
      subject
      testDate
      testNumber
      release
      releaseDate
      published
      publishDate
      panelsCount
      questionsCount
      accuracy
      answersCount
      challengeCount
      testType
    }
  }
}
`

export const NEW_COURSE_DASHBOARD_QUERY2 = gql`
query CourseDashboardQuery($courseId:ID!){
  courseDashboard(courseId:$courseId){
    id
    name
    courseNumber
    time
    deleted
    studentCount
    testCount
    courseTestList{
      id
      deleted
    }
  }
}
`

export const TEST_LIST_QUERY2 = gql`
query TestListQuery($testId:ID!){
  testList(testId:$testId){
      id
      deleted
      subject
      testDate
      testNumber
      release
      releaseDate
      published
      publishDate
      panelsCount
      questionsCount
      accuracy
      answersCount
      challengeCount
  }
}
`

export const CHALLENGE_SECTION_QUERY = gql`
query ChallengeQuery($challengeId:ID!){
  challenge(id:$challengeId){
    id
    challenge
    addedBy{
      id
      firstName
      lastName
    }
    addedDate
  	answer{
      id
      answer{
        id
        choice
        question{
          id
          addedBy{
            id
            firstName
            lastName
          }
          panel{
            id
            link
          }
          test{
            id
          }
          question
          choices{
            id
            choice
            correct
            }
          }
        }
      }
    }
  }
`

export const PUBLISH_TEST_MUTATION = gql`
  mutation PublishTest(
    $startHour:String!
    $testEndDate: DateTime,
    $endHour: String!
    $testId:ID!){
      publishTest(
        startHour:$startHour,
        endHour:$endHour,
        testEndDate:$testEndDate,
        testId:$testId){
          id
        }
      }
    `
export const NEW_PUBLISH_TEST_MUTATION = gql`
mutation PublishTest(
  $testId:ID!,
  $startTime:String!,
  $endTime:String!,
  $endDate:DateTime!,
  $panelId:ID!,
  $question:String!,
  $choice1:String!,
  $choiceCorrect1:Boolean!,
  $choice2:String!,
  $choiceCorrect2:Boolean!,
  $choice3:String!,
  $choiceCorrect3:Boolean!,
  $choice4:String!,
  $choiceCorrect4:Boolean!){
    publishTest(
      testId:$testId,
      startTime:$startTime,
      endTime:$endTime,
      endDate:$endDate,
      panelId:$panelId,
      question:$question,
      choice1:$choice1,
      choiceCorrect1:$choiceCorrect1,
      choice2:$choice2,
      choiceCorrect2:$choiceCorrect2,
      choice3:$choice3,
      choiceCorrect3:$choiceCorrect3,
      choice4:$choice4,
      choiceCorrect4:$choiceCorrect4){
        id
      }
}
`

export const PUBLISH_TEST_REFETCH_QUERY = gql`
query TestQuery($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      release
      releaseDate
      published
      publishDate
      questions{
        challenges{
          challenge
          id
          question{
            question
            addedBy{
              firstName
              lastName
            }
          }
          addedBy{
            firstName
            lastName
          }
        }
      }
      course{
        id
        name
        courseNumber
      }
      panels{
        id
    }
    }
  }
`

export const EDIT_PUBLISH_TEST_MUTATION = gql`
mutation EditPublishTest(
  $published:Boolean
  $startTime:String
  $endDate: DateTime,
  $endTime: String
  $testId:ID!){
    editPublishTest(
      published:$published,
      startTime:$startTime,
      endTime:$endTime,
      endDate:$endDate,
      testId:$testId){
        id
      }
    }
    `

export const INSTITUTIONS_QUERY = gql`
query InstitutionsQuery{
  institutions{
    count
    institutions{
      id
      name
      type
      admins{
        id
        firstName
        lastName
      }
      courses{
        id
        name
        deleted
      }
      teachers{
        id
        firstName
        lastName
      }
    }
  }
}
`

export const ADD_INSTITUTION_MUTATION = gql`
  mutation AddInstitution($name:String!,$type:String,$address1:String,$address2:String,$city:String,$state: String, $zip: String, $phone: String, $email: String){
    addInstitution(name:$name,type:$type,address1:$address1, address2: $address2, city: $city, state: $state, zip: $zip, phone: $phone, email: $email){
      id
      name
      type
    }
  }
  `

export const INSTITUTION_QUERY = gql`
query InstitutionQuery($institutionId:ID!){
  institution(id:$institutionId){
    id
    type
    name
    address1
    address2
    city
    state
    zip
    phone
    email
    admins{
      id
      firstName
      lastName
      email
      teacherCourses{
        id
        deleted
      }
    }
    courses{
      id
      name
      deleted
      institution{
        id
        name
      }
      students{
        id
      }
    }
    students{
      id
      firstName
      lastName
      email
      studentCourses{
        id
        deleted
      }
    }
    teachers{
      id
      firstName
      lastName
      email
      teacherCourses{
        id
        deleted
      }
    }
  }
}
`

export const EDIT_INSTITUTION_MUTATION = gql`
mutation EditInstitution(
  $id:ID!,
  $name:String,
  $address1:String,
  $address2:String,
  $city:String,
  $state:String,
  $zip:String,
  $email:String,
  $phone:String
){
  updateInstitution(id:$id,
  name:$name,
  address1:$address1,
  address2:$address2,
  city:$city,
  state:$state,
  zip:$zip,
  email:$email,
  phone:$phone,
  ){
    id
    name
    address1
    address2
    city
    state
    zip
    email
    phone
  }
}
`

export const DELETE_INSTITUTION_MUTATION = gql`
mutation DeleteInstitution($institutionId:ID!){
  deleteInstitution(id:$institutionId){
    id
  }
}
`

export const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!,$lastName:String!,$email: String!,$password: String!,$role: String!){
    signup(firstName:$firstName,lastName:$lastName,
    email:$email, password:$password, role: $role){
      authMsg
      user{
        firstName
        lastName
      }
    }
  }
  `

export const SIGNUP_ADMIN_MUTATION = gql`
  mutation SignUpAdmin($email:String!,
    $password:String!,
    $firstName:String!,
    $lastName:String!,
    $title: String,
    $address1:String,
    $address2:String,
    $city:String,
    $state: String,
    $zip: String,
    $phone: String,
    $role:String!,
    $institutionId:ID!){
  signupAdmin(email:$email,
    password:$password,
    firstName:$firstName,
    lastName:$lastName,
    title: $title,
    address1:$address1,
    address2: $address2,
    city: $city,
    state: $state,
    zip: $zip,
    phone: $phone,
    role:$role,
    institutionId:$institutionId){
      user{
        firstName
        lastName
        adminInstitutions{
          name
        }
      }
    }
  }
  `
  export const SIGNUP_TEACHER_MUTATION = gql`
    mutation SignUpTeacher($email:String!,
      $password:String!,
      $firstName:String!,
      $lastName:String!,
      $title: String,
      $address1:String,
      $address2:String,
      $city:String,
      $state: String,
      $zip: String,
      $phone: String,
      $role:String!,
      $institutionId:ID!){
    signupTeacher(email:$email,
      password:$password,
      firstName:$firstName,
      lastName:$lastName,
      title: $title,
      address1:$address1,
      address2: $address2,
      city: $city,
      state: $state,
      zip: $zip,
      phone: $phone,
      role:$role,
      institutionId:$institutionId){
        user{
          firstName
          lastName
          teacherInstitutions{
            name
          }
        }
      }
    }
    `

export const PERSONNEL_QUERY = gql`
query PersonnelQuery($userId:ID!){
  user(id:$userId){
    id
    firstName
    lastName
    email
    phone
    title
    department
    address1
    address2
    city
    state
    zip
    role
    teacherCourses{
      id
      name
      courseNumber
      institution{
        id
        name
      }
      deleted
      students{
        id
      }
    }
    studentCourses{
      id
      name
      courseNumber
      deleted
      institution{
        id
        name
      }
      students{
        id
      }
    }
  }
}
`

export const EDIT_PERSONNEL_MUTATION = gql`
mutation EditPersonnel($userId: ID!,
  	$email:String!,
    $firstName:String!,
    $lastName:String!,
    $title: String,
    $department: String,
    $address1:String,
    $address2:String,
    $city:String,
    $state: String,
    $zip: String,
    $phone: String){
  updatePersonnel(
    userId:$userId,
    email:$email,
    firstName:$firstName,
    lastName:$lastName,
    title: $title,
    department: $department,
    address1:$address1,
    address2: $address2,
    city: $city,
    state: $state,
    zip: $zip,
    phone: $phone){
      	id
      }
    }
  `

export const CREATE_QUESTION_QUERY = gql`
query CreateQuestionQuery($questionId:ID!){
  question(id:$questionId){
    id
    question
    sentPanel{
      link
      id
    }
    test{
      id
      subject
      testDate
      testNumber
      course{
        id
        name
        institution{
          id
          name
        }
      }
    }
  }
}
`

export const CREATE_QUESTION_MUTATION = gql`
mutation CreateQuestion(
  $question: String!,
  $testId:ID!,
  $panelId:ID!,
  $choice1:String!,
  $choiceCorrect1: Boolean!,
  $choice2:String!,
  $choiceCorrect2: Boolean!,
  $choice3:String!,
  $choiceCorrect3: Boolean!,
  $choice4:String!,
  $choiceCorrect4: Boolean!,
  ){
    createQuestion(
      question: $question,
      testId:$testId,
      panelId:$panelId,
      choice1: $choice1,
      choiceCorrect1: $choiceCorrect1,
      choice2: $choice2,
      choiceCorrect2: $choiceCorrect2,
      choice3: $choice3,
      choiceCorrect3: $choiceCorrect3,
      choice4: $choice4,
      choiceCorrect4: $choiceCorrect4,
    ){
        id
        test{
          id
        }
      }
    }
  `

export const ANSWER_QUESTION_QUERY = gql`
  query AnswerQuestionQuery($questionId:ID!){
    question(id:$questionId){
      id
      question
      choices {
        id
        choice
        correct
      }
      test{
        id
        subject
        testNumber
        course{
          id
          name
          institution{
            id
            name
          }
        }
      }
    }
  }
`

export const ANSWER_QUESTION_MUTATION = gql`
  mutation AnswerQuestionMutation(
    $questionId:ID!,
  	$answerChoiceId:ID!){
    addAnswer(
      questionId:$questionId,
      answerChoiceId:$answerChoiceId
    ){
      id
    }
  }
`

export const QUESTION_QUERY = gql`
  query CreateReviewQuery($questionId:ID!){
    question(id:$questionId){
      id
      question
      choices {
        id
        choice
        correct
      }
      panel{
        link
        id
      }
      test{
        id
        subject
        course{
          id
          name
          institution{
            id
            name
          }
        }
      }
    }
  }
`

export const SEND_QUESTION_MUTATION = gql`
  mutation SendQuestion($testId: ID!, $questionId:ID! ){
    sendQuestion(testId:$testId, questionId:$questionId){
      question
      id
    }
  }
`

export const EDIT_QUESTION_QUERY = gql`
query EditQuestionQuery($questionId:ID!){
  question(id:$questionId){
    id
    question
    choices{
      id
      choice
      correct
    }
    panel{
      id
      link
    }
    test{
      id
      subject
      testDate
      testNumber
      course{
        id
        name
        institution{
          id
          name
        }
      }
    }
  }
}
`

export const EDIT_QUESTION_MUTATION = gql`
mutation EditQuestion(
    $id:ID!,
    $question:String,
  	$choice1:String,
  	$choice2:String,
  	$choice3:String,
  	$choice4:String,
  	$choiceCorrect1:Boolean,
  	$choiceCorrect2:Boolean,
  	$choiceCorrect3:Boolean,
  	$choiceCorrect4:Boolean,
  	$choice1Id:ID,
  	$choice2Id:ID,
  	$choice3Id:ID,
  	$choice4Id:ID){
  updateQuestion(
    id:$id,
    question:$question,
    choice1:$choice1,
    choice2:$choice2,
  	choice3:$choice3,
  	choice4:$choice4,
  	choiceCorrect1:$choiceCorrect1,
  	choiceCorrect2:$choiceCorrect2,
  	choiceCorrect3:$choiceCorrect3,
  	choiceCorrect4:$choiceCorrect4,
  	choice1Id:$choice1Id,
  	choice2Id:$choice2Id,
  	choice3Id:$choice3Id,
  	choice4Id:$choice4Id,){
    question
    choices{
      choice
    }
  }
}
`

export const ANSWERED_QUESTION_QUERY = gql`
query AnswerQuery($answerId:ID!){
  answer(id:$answerId){
    id
    answer{
      id
      choice
      correct
    }
    question{
      id
      question
      panel{
        id
        link
      }
      choices{
        id
        choice
        correct
      }
      test{
        id
        subject
        testNumber
        course{
          id
          name
          institution{
            id
            name
          }
        }
      }
    }
  }
}
`

export const CREATE_CHALLENGE_MUTATION = gql`
  mutation CreateChallenge($answerId:ID!,$challenge:String!){
    addChallenge(challenge:$challenge,answerId:$answerId){
      id
    }
  }
`

export const CHALLENGE_ANSWER_QUERY = gql`
query ChallengeAnswerQuery($questionId:ID!){
  answers(where:{question:{id:$questionId}}){
    answers{
    id
    answer{
      id
      choice
      correct
    }
    question{
      id
      question
      panel{
        id
        link
      }
      choices{
        id
        choice
        correct
      }
      challenges{
        id
        challenge
      }
      test{
        id
        subject
        testNumber
        course
        {
          id
          name
          institution{
            id
            name
          }
        }
      }
    }
  }
}
}
`

export const CHALLENGE_QUERY = gql`
query ChallengeQuery($challengeId:ID!){
    challenge(id:$challengeId){
   	 	id
      challenge
      addedBy{
        id
        firstName
        lastName
      }
    	answer{
      	id
    		answer{
          id
          choice
          correct
          question{
            question
            panel{
              id
              link
            }
            test{
              id
            }
            choices{
              id
              choice
              correct
            }
          }
        }
      }
    }
  }
`

export const CHALLENGE_QUESTION_QUERY = gql`
  query ChallengesQuestionQuery($questionId:ID!){
    challenges(where:{answer:{question:{id:$questionId}}}){
      challenges{
        id
        challenge
        addedDate
        addedBy{
          id
          firstName
          lastName
        }
      }
    }
  }
`
export const EDIT_CHALLENGE_MUTATION = gql`
mutation EditChallenge($challengeiId:ID!,
  $challenge:String){
  updateChallenge(id:$challengeiId,
  challenge:$challenge){
    id
    challenge
  }
}
`

export const USER_QUESTION_QUERY = gql`
    query UserQuestionStats($testId:ID!){
      userQuestionStats(testId:$testId){
        totalQuestions
        totalCorrect
        percentCorrect
        answers
      }
    }
    `

export const USER_QUESTION_STATS_QUERY = gql`
  query UserQuestionStats($testId:ID!){
    userQuestionStats(testId:$testId){
      totalQuestions
      totalCorrect
      percentCorrect
      answers
    }
  }
  `
export const USER_QUESTIONS_QUERY_OLD = gql`
query UserQuestions($testId:ID!){
  userQuestions(testId:$testId){
    id
    question
    choices{
      id
      choice
      correct
    }
    questionAnswers{
      id
      answerCorrect
      answer{
        id
        choice
        correct
      }
    }
  }
}
`

export const USER_QUESTIONS_QUERY = gql`
query UserQuestions($testId:ID!){
	userQuestions1(testId:$testId){
    totalCorrect
    totalQuestions
    percentCorrect
    answers
    questions{
      id
    question
    choices{
      id
      choice
      correct
    }
    questionAnswers{
      id
      answerCorrect
      answer{
        id
        choice
        correct
      }
    }
    }
  }
}
`

export const USER_ANSWERED_QUERY = gql`
query UserAnsweredStats($testId:ID!){
  userAnsweredStats(testId:$testId){
    total
    totalCorrect
    percentCorrect
  }
}
`

export const USER_ANSWERS_QUERY_OLD = gql`
query UserAnswers($testId:ID!){
  userAnswers(testId:$testId){
    id
    answerCorrect
    answer{
      id
      choice
    }
    question{
      id
      question
      choices{
        id
        choice
        correct
      }
    }
  }
}
`

export const USER_ANSWERS_QUERY = gql`
query UserAnswers($testId:ID!){
  userAnswers1(testId:$testId){
    totalCorrect
    total
    percentCorrect
    answers{
      id
    answerCorrect
    answer{
      id
      choice
    }
    question{
      id
      question
      choices{
        id
        choice
        correct
      }
    }
    }
  }
}
`

export const TEST_QUESTIONS_QUERY = gql`
query TestQuestionsQuery($testId:ID!){
  test(id:$testId){
    id
    subject
    testNumber
    testDate
    course{
      id
      name
      courseNumber
    }
    questions{
      id
      question
    }
  }
}
`

export const STUDENT_CHALLENGES = gql`
query StudentChallenges($userId:ID!,$testId:ID!){
  challenges(where:{AND:[{addedBy:{id:$userId}},
    {answer:{question:{test:{id:$testId}}}}]}){
    count
  	challenges{
      id
      challenge
      addedDate
      addedBy{
        id
        firstName
        lastName
      }
    }
  }
}
`
