import React, { useState } from 'react';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text,
  Card, CardBody, CardHeader , Button, Input, useMediaQuery, useColorModeValue

 } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
interface AnalyticsCardProps {
  title: string;
  content: React.ReactNode;
}
type Expense = {
  date: string
  amount: number
}


const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, content }) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { date: "2023-01", amount: 500 },
    { date: "2023-02", amount: 300 },
    { date: "2023-03", amount: 600 },
    { date: "2023-04", amount: 400 },
    { date: "2023-05", amount: 550 },
  ])
  const [newExpense, setNewExpense] = useState<Expense>({ date: "", amount: 0 })
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardColor = useColorModeValue('black', 'white');

  return (

    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <Text className="text-2xl font-bold">Expense Tracker</Text>
        <Text>Visualize and manage your monthly expenses</Text>
      </CardHeader>
      <CardBody>
        <div className="mb-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenses} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              {/* <Tooltip content="chart" />
              <Bar
                dataKey={"amount"}
                fill="hsl(var(--primary))"
                activeBar={{ fill: "hsl(var(--primary) / 0.8)" }}
              /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Text>
              Date (YYYY-MM)
            </Text>
            <Input
              id="date"
              type="text"
              placeholder="YYYY-MM"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              className="w-full"
            />
          </div>
          <div>
            <Text>
              Amount ($)
            </Text>
            <Input
              id="amount"
              type="number"
              placeholder="Amount"
              value={newExpense.amount || ""}
              onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={()=>{console.log('Clicked')}} className="w-full">
              Add Expense
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>




    // <StatGroup
    //   bg={cardBg}
    //   borderRadius="md"
    //   padding="4"
    //   boxShadow="md"
    //   color={cardColor}
    // >
    //   <Stat>
    //     <StatLabel>Total requests</StatLabel>
    //     <StatNumber>670</StatNumber>
    //     <StatHelpText>
    //       <StatArrow type='increase' />
    //       23.36%
    //     </StatHelpText>
    //   </Stat>

    //   <Stat>
    //     <StatLabel fontSize={{ base: 'sm', md: 'md' }}>Money saved</StatLabel>
    //     <StatNumber fontSize={{ base: 'sm', md: 'md' }}>Ksh. 45.30</StatNumber>
    //     <StatHelpText fontSize={{ base: 'sm', md: 'md' }}>
    //       <StatArrow type='increase' />
    //       9.05%
    //     </StatHelpText>
    //   </Stat>
    // </StatGroup>
  );
};

export default AnalyticsCard;
