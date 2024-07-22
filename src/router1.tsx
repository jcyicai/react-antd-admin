import {
  createBrowserRouter,
  Form,
  Link,
  Navigate,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
  useParams,
  useSearchParams
} from 'react-router-dom'
import App from './App.tsx'

function ReactComp() {
  return (
    <div>
      React组件<Link to='..'>back</Link>
    </div>
  )
}

function ViteComp() {
  return (
    <div>
      Vite组件<Link to='..'>back</Link>
    </div>
  )
}

function TestComp() {
  return <div>test组件{<Navigate to='/react' />}</div>
}

function NotFound() {
  return (
    <h2>
      404,当前页面不存在 <Link to='..'>back</Link>
    </h2>
  )
}

function OrderComp() {
  const params = useParams()
  console.log('order init')
  return <h2>订单组件，订单id: {params.id}</h2>
}

function GoodsComp() {
  const params = useParams()
  return (
    <div>
      <h2>商品主页</h2>
      <p>
        <span>商品id:{params.goodsId}</span>
        <span>订单id:{params.orderId}</span>
      </p>
    </div>
  )
}

function Goods2() {
  return (
    <div>
      <h2>商品主页</h2>
      <Outlet></Outlet>
    </div>
  )
}

function Order() {
  const data = useLoaderData()
  console.log('order init', data)
  return <h2>订单组件，订单id:</h2>
}

function orderLoader({ params }: any) {
  console.log('loader init', params)
  if (!sessionStorage.token) return redirect('/login')
  return fetch(`/${params.id}.json`)
  //return { name: 'jc', token: sessionStorage.token }
}

function Login() {
  const errors: any = useActionData()

  return (
    <Form method='post'>
      <p>
        <input type='text' name='email' />
        {errors?.email && <span>{errors.email}</span>}
      </p>

      <p>
        <input type='text' name='password' />
        {errors?.password && <span>{errors.password}</span>}
      </p>

      <p>
        <button type='submit'>Sign up</button>
      </p>
    </Form>
  )
}

async function loginAction({ request }: any) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const errors: any = {}

  // validate the fields
  if (typeof email !== 'string' || !email.includes('@')) {
    errors.email = "That doesn't look like an email address"
  }

  if (typeof password !== 'string' || password.length < 6) {
    errors.password = 'Password must be > 6 characters'
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors
  }

  // otherwise create the user and redirect
  //await createUser(email, password);
  console.log('登录成功')
  return redirect('/')
}

function Payment() {
  // 地址栏获取参数 ?id=1001
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  // 地址栏 动态参数  order/1001
  const data = useLoaderData()
  console.log('payment init search params', searchParams.get('id'))
  console.log('payment init loader data', data)
  return <h2>付款组件，付款id:{id}</h2>
}

function paymentLoader({ params }: any) {
  console.log('payment loader init', params)
  return { id: 'jc' }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/payment', // 'payment/:id'
    element: <Payment />,
    loader: paymentLoader
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction
  },
  {
    path: '/order/:id',
    /* element: <OrderComp />, */
    element: <Order />,
    loader: orderLoader
  },
  {
    path: '/goods/:goodsId/order/:orderId',
    element: <GoodsComp />
  },
  {
    path: '/goods',
    element: <Goods2 />,
    children: [
      {
        path: 'list', // 不用添加 / ，否则变为根地址
        element: (
          <div>
            <p>商品1</p>
          </div>
        )
      },
      {
        path: 'cart',
        element: (
          <div>
            <p>购物车</p>
          </div>
        )
      }
    ]
  },
  {
    path: '/react',
    element: <ReactComp />
  },
  {
    path: '/vite',
    element: <ViteComp />
  },
  {
    path: '/test',
    element: <TestComp />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
